import { Controller, Get, Put, Body, UseGuards, Request, Delete, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Request() req: any, @Body() data: any) {
    return this.userService.updateProfile(req.user.userId, data);
  }

  // --- ADMIN APIs ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // --- WISHLIST APIs ---
  @UseGuards(JwtAuthGuard)
  @Get('profile/wishlist')
  async getWishlist(@Request() req: any) {
    return this.userService.getWishlist(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/wishlist/:productId')
  async toggleWishlist(@Request() req: any, @Param('productId') productId: string) {
    return this.userService.toggleWishlist(req.user.userId, productId);
  }
}
