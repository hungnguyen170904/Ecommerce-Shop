import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
  }

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count({ where: { role: 'USER' } });
    const totalOrders = await this.prisma.order.count();
    
    // Doanh thu chỉ tính các đơn DELIVERED
    const deliveredOrders = await this.prisma.order.findMany({
      where: { status: 'DELIVERED' },
      select: { totalAmount: true }
    });
    const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      totalUsers,
      totalOrders,
      totalRevenue
    };
  }
}
