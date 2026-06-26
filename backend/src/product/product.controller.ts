import { Controller, Get, Param, Query, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // API Lấy toàn bộ sản phẩm đang kích hoạt (có hỗ trợ tìm kiếm)
  @Get()
  findAll(@Query('search') search?: string, @Query('categorySlug') categorySlug?: string) {
    return this.productService.findAll(search, categorySlug);
  }

  // --- ADMIN APIs ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  getAllForAdmin() {
    return this.productService.getAllForAdmin();
  }

  // API Lấy chi tiết 1 sản phẩm theo Slug (Ví dụ: iphone-15-pro-max)
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  createProduct(@Body() data: any) {
    return this.productService.createProduct(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.productService.updateProduct(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
