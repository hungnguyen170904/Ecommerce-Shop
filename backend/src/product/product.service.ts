import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, categorySlug?: string) {
    const where: any = { isActive: true };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if (categorySlug) {
      where.categories = {
        some: {
          category: { slug: categorySlug }
        }
      };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        brand: true,
        variants: {
          where: { isActive: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        brand: true,
        categories: {
          include: { category: true }
        },
        attributes: true,
        variants: {
          where: { isActive: true },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    return product;
  }

  // --- ADMIN METHODS ---

  async getAllForAdmin() {
    return this.prisma.product.findMany({
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        brand: true,
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createProduct(data: any) {
    // Generate a basic slug if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description,
        basePrice: data.basePrice,
        brandId: data.brandId || null,
        images: data.imageUrl ? {
          create: [{ url: data.imageUrl, isPrimary: true }]
        } : undefined,
        categories: data.categoryId ? {
          create: [{ categoryId: data.categoryId }]
        } : undefined,
      }
    });
  }

  async updateProduct(id: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm để cập nhật');

    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        isActive: data.isActive,
        categories: data.categoryId ? {
          deleteMany: {},
          create: [{ categoryId: data.categoryId }]
        } : undefined,
      }
    });
  }

  async deleteProduct(id: string) {
    // Để an toàn, chúng ta chỉ nên set isActive = false thay vì xóa hẳn (Soft Delete)
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false }
    });
  }
}
