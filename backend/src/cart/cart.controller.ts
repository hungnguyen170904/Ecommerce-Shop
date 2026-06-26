import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.userId); // req.user có được từ JwtAuthGuard
  }

  @Post()
  addToCart(@Request() req: any, @Body() body: { variantId: string, quantity: number }) {
    return this.cartService.addToCart(req.user.userId, body.variantId, body.quantity || 1);
  }

  @Put(':id')
  updateQuantity(@Request() req: any, @Param('id') itemId: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(req.user.userId, itemId, quantity);
  }

  @Delete(':id')
  removeItem(@Request() req: any, @Param('id') itemId: string) {
    return this.cartService.removeItem(req.user.userId, itemId);
  }
}
