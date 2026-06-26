import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('admin')
  createCoupon(@Body() data: any) {
    return this.couponService.createCoupon(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  validateCoupon(@Body() data: { code: string, totalAmount: number }) {
    return this.couponService.validateCoupon(data.code, data.totalAmount);
  }
}
