import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private emailService: EmailService, private inventoryService: InventoryService) {}

  async checkout(userId: string, shippingAddress: string = '', paymentMethod: string = 'COD', couponCode: string = '') {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { variant: { include: { product: true } } }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng của bạn đang trống');
    }

    // Tính tổng tiền đơn hàng
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
      const price = item.variant.price ?? item.variant.product.basePrice;
      totalAmount += price * item.quantity;
      return {
        variantId: item.variantId,
        quantity: item.quantity,
        price: price
      };
    });

    // Xử lý Coupon
    let discountAmount = 0;
    let validCouponId = null;

    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      });

      if (coupon && coupon.isActive && new Date() >= coupon.startDate && new Date() <= coupon.endDate && totalAmount >= coupon.minOrderValue) {
        if (coupon.discountType === 'FIXED_AMOUNT') {
          discountAmount = coupon.discountValue;
        } else {
          discountAmount = totalAmount * (coupon.discountValue / 100);
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        }
        validCouponId = coupon.id;
        totalAmount = totalAmount - discountAmount > 0 ? totalAmount - discountAmount : 0;
      }
    }

    // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu
    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress,
          paymentMethod,
          items: {
            create: orderItems
          },
          statusHistory: {
            create: { status: 'PENDING' }
          }
        }
      });

      // Lưu lịch sử dùng coupon
      if (validCouponId) {
        await tx.couponUsage.create({
          data: {
            couponId: validCouponId,
            userId: userId,
            orderId: newOrder.id
          }
        });
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    // Trừ tồn kho bằng Inventory Transaction (OUT)
    await this.inventoryService.processOrderCheckout(order.id, orderItems);

    // Sau khi transaction thành công, lấy thông tin user để gửi email
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    // Lấy lại order kèm chi tiết sản phẩm để email có tên SP
    const orderWithDetails = await this.prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: { variant: { include: { product: true } } }
        }
      }
    });

    if (user && orderWithDetails) {
      // Gửi email bất đồng bộ (không await để khỏi block response)
      this.emailService.sendOrderConfirmation(user.email, orderWithDetails, user).catch(err => {
        console.error('Lỗi khi gửi email sau khi checkout:', err);
      });
    }

    return order;
  }

  async getHistory(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { variant: { include: { product: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAllOrdersForAdmin() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: { variant: { include: { product: true } } }
        },
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateOrderStatus(orderId: string, status: any) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    // Tính năng Tích điểm (Loyalty)
    if (status === 'DELIVERED') {
      const user = await this.prisma.user.findUnique({ where: { id: order.userId } });
      if (user) {
        const pointsEarned = Math.floor(order.totalAmount / 10000);
        const newPoints = user.points + pointsEarned;
        
        let newTier = 'MEMBER';
        if (newPoints >= 10000) newTier = 'DIAMOND';
        else if (newPoints >= 5000) newTier = 'GOLD';
        else if (newPoints >= 1000) newTier = 'SILVER';

        await this.prisma.$transaction([
          this.prisma.user.update({
            where: { id: user.id },
            data: { points: newPoints, tier: newTier }
          }),
          this.prisma.pointHistory.create({
            data: {
              userId: user.id,
              points: pointsEarned,
              reason: `Mua đơn hàng #${order.id.split('-')[0].toUpperCase()}`
            }
          })
        ]);
      }
    }
    return order;
  }

  // --- Tính năng Đổi/Trả hàng ---
  async requestReturn(userId: string, orderId: string, reason: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Không tìm thấy đơn hàng');
    if (order.userId !== userId) throw new BadRequestException('Không có quyền thao tác đơn hàng này');
    if (order.status !== 'DELIVERED') throw new BadRequestException('Chỉ có thể đổi trả đơn hàng đã giao thành công');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { returnStatus: 'REQUESTED', returnReason: reason }
    });
  }

  async processReturn(orderId: string, returnStatus: string) {
    // returnStatus: APPROVED, REJECTED, RETURNED
    return this.prisma.order.update({
      where: { id: orderId },
      data: { returnStatus }
    });
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Không tìm thấy đơn hàng');
    if (order.userId !== userId) throw new BadRequestException('Không có quyền hủy đơn hàng này');
    if (order.status !== 'PENDING') throw new BadRequestException('Chỉ có thể hủy đơn hàng đang chờ xử lý');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' }
    });
  }

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count({ where: { role: 'USER' } });
    const totalOrders = await this.prisma.order.count();
    
    // Doanh thu tổng
    const totalRevAgg = await this.prisma.order.aggregate({
      where: { status: 'DELIVERED' },
      _sum: { totalAmount: true }
    });
    const totalRevenue = totalRevAgg._sum.totalAmount || 0;

    // Tính doanh thu theo 6 tháng gần nhất (chỉ lấy data 6 tháng)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const recentDeliveredOrders = await this.prisma.order.findMany({
      where: { 
        status: 'DELIVERED',
        createdAt: { gte: sixMonthsAgo }
      },
      select: { totalAmount: true, createdAt: true }
    });

    const revenueByMonth = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = `T${d.getMonth() + 1}`;
      
      const monthOrders = recentDeliveredOrders.filter(o => {
        const oDate = new Date(o.createdAt);
        return oDate.getMonth() === d.getMonth() && oDate.getFullYear() === d.getFullYear();
      });
      
      const monthRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      revenueByMonth.push({ name: monthName, total: monthRevenue });
    }

    // Tính trạng thái đơn hàng (Tối ưu bằng SQL Group By)
    const statusGroups = await this.prisma.order.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    
    const ordersByStatus = statusGroups.map(g => ({
      name: g.status,
      value: g._count.status
    }));

    // Dữ liệu mới cho Admin Pro
    const variantsCount = await this.prisma.productVariant.count();
    const lowStockCount = Math.floor(variantsCount * 0.15) || 5; // Giả lập 15% sản phẩm sắp hết hàng

    const ratingAgg = await this.prisma.review.aggregate({
      _avg: { rating: true }
    });
    const averageRating = ratingAgg._avg.rating || 5.0;

    const recentOrders = await this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true, avatarUrl: true } }
      }
    });

    const topProducts = await this.prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'asc' }, // Mock dữ liệu lấy 5 sp ngẫu nhiên/cũ nhất
      include: {
        brand: { select: { name: true } },
        images: { take: 1, select: { url: true } }
      }
    });

    return {
      totalUsers,
      totalOrders,
      totalRevenue,
      revenueByMonth,
      ordersByStatus,
      lowStockCount,
      averageRating,
      recentOrders,
      topProducts
    };
  }
}
