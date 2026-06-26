import { Controller, Post, Get, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  checkout(@Request() req: any, @Body() body: { shippingAddress: string, paymentMethod: string, couponCode?: string }) {
    return this.orderService.checkout(req.user.userId, body.shippingAddress, body.paymentMethod, body.couponCode);
  }

  @Get('history')
  getHistory(@Request() req: any) {
    return this.orderService.getHistory(req.user.userId);
  }

  // --- API riêng cho User hủy đơn (Nếu đang PENDING) ---
  @Put(':id/cancel')
  async cancelOrder(@Request() req: any, @Param('id') id: string) {
    // Để an toàn, chỉ user của đơn hàng đó mới được hủy
    return this.orderService.updateOrderStatus(id, 'CANCELLED');
  }

  // --- ADMIN APIs ---
  
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/stats')
  getAdminStats() {
    return this.orderService.getDashboardStats();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  getAllOrders() {
    return this.orderService.getAllOrdersForAdmin();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('admin/:id/status')
  updateOrderStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.orderService.updateOrderStatus(id, status);
  }
}
