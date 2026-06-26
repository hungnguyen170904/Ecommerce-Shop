import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: { include: { images: true } } }
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
                include: { product: { include: { images: true } } }
              }
            }
          }
        }
      });
    }

    return cart;
  }

  async addToCart(userId: string, variantId: string, quantity: number) {
    const cart = await this.getCart(userId);

    const existingItem = cart.items.find(item => item.variantId === variantId);

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    return this.getCart(userId);
  }

  async updateQuantity(userId: string, itemId: string, quantity: number) {
    const cart = await this.getCart(userId);
    const item = cart.items.find(i => i.id === itemId);
    if (!item) throw new Error('Item not found in cart');

    if (quantity <= 0) {
      return this.removeItem(userId, itemId);
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getCart(userId);
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return cart;

    await this.prisma.cartItem.delete({
      where: { id: itemId }
    });
    return this.getCart(userId);
  }
}
