import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
      }
    });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return user;
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        role: true,
      }
    });
  }

  // --- WISHLIST ---
  async getWishlist(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        wishlistProducts: {
          include: {
            images: true
          }
        }
      }
    });
    return user?.wishlistProducts || [];
  }

  async toggleWishlist(userId: string, productId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { wishlistProducts: true }
    });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const isWishlisted = user.wishlistProducts.some(p => p.id === productId);

    if (isWishlisted) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          wishlistProducts: {
            disconnect: { id: productId }
          }
        }
      });
      return { isWishlisted: false };
    } else {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          wishlistProducts: {
            connect: { id: productId }
          }
        }
      });
      return { isWishlisted: true };
    }
  }

  // --- ADMIN APIs ---
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Soft delete or real delete. Let's do a role update or delete.
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
