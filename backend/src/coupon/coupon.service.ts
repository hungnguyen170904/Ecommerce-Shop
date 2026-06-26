import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscountType } from '@prisma/client';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async getAllCoupons() {
    const coupons = await this.prisma.coupon.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        _count: {
          select: { usages: true }
        }
      }
    });
    
    return coupons.map(c => ({
      ...c,
      usageCount: c._count.usages
    }));
  }

  async createCoupon(data: any) {
    return this.prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        description: data.description,
        discountType: data.discountType as DiscountType,
        discountValue: parseFloat(data.discountValue),
        minOrderValue: parseFloat(data.minOrderValue) || 0,
        maxDiscount: data.maxDiscount ? parseFloat(data.maxDiscount) : null,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive !== undefined ? data.isActive : true,
      }
    });
  }

  async validateCoupon(code: string, totalAmount: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: { usages: true }
    });

    if (!coupon) {
      throw new BadRequestException('Mã giảm giá không tồn tại.');
    }

    if (!coupon.isActive) {
      throw new BadRequestException('Mã giảm giá đã bị vô hiệu hóa.');
    }

    const now = new Date();
    if (now < coupon.startDate) {
      throw new BadRequestException('Mã giảm giá chưa đến ngày sử dụng.');
    }
    if (now > coupon.endDate) {
      throw new BadRequestException('Mã giảm giá đã hết hạn.');
    }

    if (coupon.usageLimit && coupon.usages.length >= coupon.usageLimit) {
      throw new BadRequestException('Mã giảm giá đã hết lượt sử dụng.');
    }

    if (totalAmount < coupon.minOrderValue) {
      throw new BadRequestException(`Đơn hàng phải từ ${coupon.minOrderValue} để áp dụng mã này.`);
    }

    let discountAmount = 0;
    if (coupon.discountType === 'FIXED_AMOUNT') {
      discountAmount = coupon.discountValue;
    } else {
      discountAmount = totalAmount * (coupon.discountValue / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    }

    return {
      couponId: coupon.id,
      code: coupon.code,
      discountAmount,
      finalAmount: totalAmount - discountAmount > 0 ? totalAmount - discountAmount : 0
    };
  }
}
