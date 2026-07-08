import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Hàm nội bộ để chỉ lấy cartId (nhẹ hơn getCart đầy đủ)
  private async getOrCreateCartId(userId: string): Promise<string> {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        select: { id: true }
      });
    }
    return cart.id;
  }

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: { include: { images: { take: 1, orderBy: { sortOrder: 'asc' } } } } }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              variant: {
                include: { product: { include: { images: { take: 1, orderBy: { sortOrder: 'asc' } } } } }
              }
            }
          }
        }
      });
    }

    return cart;
  }

  async addToCart(userId: string, variantId: string, quantity: number) {
    const cartId = await this.getOrCreateCartId(userId);

    // Kiểm tra item đã có trong giỏ chưa
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId, variantId },
      select: { id: true, quantity: true }
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: { cartId, variantId, quantity },
      });
    }

    return this.getCart(userId); // Chỉ gọi 1 lần ở đây
  }

  async updateQuantity(userId: string, itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(userId, itemId);
    }

    // Kiểm tra item thuộc về user này không (bảo mật)
    const cartId = await this.getOrCreateCartId(userId);
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId },
      select: { id: true }
    });
    if (!item) throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    // Kiểm tra item thuộc về user này không (bảo mật)
    const cartId = await this.getOrCreateCartId(userId);
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId },
      select: { id: true }
    });
    if (!item) return this.getCart(userId);

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(userId);
  }
}
