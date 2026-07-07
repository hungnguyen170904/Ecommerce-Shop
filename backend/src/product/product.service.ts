import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, categorySlug?: string, page: number = 1, limit: number = 20) {
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

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          brand: true,
          categories: {
            include: { category: true }
          },
          variants: {
            where: { isActive: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
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
        variants: { where: { isActive: true } },
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
        variants: data.variants?.length > 0 ? {
          create: data.variants.map((v: any) => ({
            sku: v.sku,
            size: v.size || null,
            color: v.color || null,
            price: v.price || null,
            isActive: v.isActive !== false
          }))
        } : undefined
      }
    });
  }

  async updateProduct(id: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm để cập nhật');

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        brandId: data.brandId || null,
        isActive: data.isActive,
        categories: data.categoryId ? {
          deleteMany: {},
          create: [{ categoryId: data.categoryId }]
        } : undefined,
        images: data.imageUrl ? {
          deleteMany: {},
          create: [{ url: data.imageUrl, isPrimary: true }]
        } : undefined,
      }
    });

    // Handle Variants carefully (Upsert and Soft Delete)
    if (data.variants && Array.isArray(data.variants)) {
      const existingVariants = await this.prisma.productVariant.findMany({ where: { productId: id } });
      const newVariantIds = data.variants.map((v: any) => v.id).filter(Boolean);

      // Soft delete removed variants
      const variantsToRemove = existingVariants.filter(ev => !newVariantIds.includes(ev.id));
      for (const v of variantsToRemove) {
        await this.prisma.productVariant.update({ where: { id: v.id }, data: { isActive: false } });
      }

      // Upsert provided variants
      for (const v of data.variants) {
        if (v.id) {
          await this.prisma.productVariant.update({
            where: { id: v.id },
            data: { sku: v.sku, size: v.size || null, color: v.color || null, price: v.price || null, isActive: v.isActive !== false }
          });
        } else {
          await this.prisma.productVariant.create({
            data: {
              productId: id,
              sku: v.sku, size: v.size || null, color: v.color || null, price: v.price || null, isActive: v.isActive !== false
            }
          });
        }
      }
    }

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    // Để an toàn, chúng ta chỉ nên set isActive = false thay vì xóa hẳn (Soft Delete)
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false }
    });
  }
}
