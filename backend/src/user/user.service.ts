import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
        points: true,
        tier: true,
        avatarUrl: true,
        lastCheckIn: true,
        addresses: {
          orderBy: { isDefault: 'desc' }
        },
        pointHistories: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
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

  async changePassword(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    return { success: true };
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
        points: true,
        tier: true,
        avatarUrl: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async adjustUserPoints(userId: string, adminId: string, pointsChange: number, reason: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const newPoints = Math.max(0, user.points + pointsChange);
    
    let newTier = 'MEMBER';
    if (newPoints >= 10000) newTier = 'DIAMOND';
    else if (newPoints >= 5000) newTier = 'GOLD';
    else if (newPoints >= 1000) newTier = 'SILVER';

    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { points: newPoints, tier: newTier }
      }),
      this.prisma.pointHistory.create({
        data: {
          userId,
          points: pointsChange,
          reason: `[Admin điều chỉnh] ${reason}`
        }
      })
    ]);
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }

  // --- ADDRESS BOOK APIs ---
  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' }
    });
  }

  async addAddress(userId: string, data: any) {
    // If this is the first address, make it default
    const count = await this.prisma.address.count({ where: { userId } });
    const isDefault = count === 0 ? true : (data.isDefault || false);

    if (isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    return this.prisma.address.create({
      data: {
        userId,
        street: data.street,
        city: data.city || '',
        state: data.state || '',
        country: data.country || 'VN',
        zipCode: data.zipCode || '',
        isDefault
      }
    });
  }

  async updateAddress(userId: string, addressId: string, data: any) {
    // Verify ownership
    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== userId) throw new NotFoundException('Không tìm thấy địa chỉ');

    return this.prisma.address.update({
      where: { id: addressId },
      data: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode
      }
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== userId) throw new NotFoundException('Không tìm thấy địa chỉ');

    await this.prisma.address.delete({ where: { id: addressId } });
    
    // If deleted address was default, set another one as default
    if (address.isDefault) {
      const remaining = await this.prisma.address.findFirst({ where: { userId } });
      if (remaining) {
        await this.prisma.address.update({
          where: { id: remaining.id },
          data: { isDefault: true }
        });
      }
    }
    return { success: true };
  }

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== userId) throw new NotFoundException('Không tìm thấy địa chỉ');

    // Reset all
    await this.prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false }
    });

    // Set new default
    return this.prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true }
    });
  }

  // --- GAMIFICATION & AVATAR APIs ---
  async updateAvatar(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      select: { avatarUrl: true }
    });
  }

  async checkIn(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Kiểm tra xem đã điểm danh hôm nay chưa
    if (user.lastCheckIn && user.lastCheckIn >= today) {
      throw new Error('Bạn đã điểm danh hôm nay rồi!');
    }

    const checkInPoints = 10; // Cố định 10 điểm mỗi ngày
    const newPoints = user.points + checkInPoints;

    let newTier = 'MEMBER';
    if (newPoints >= 10000) newTier = 'DIAMOND';
    else if (newPoints >= 5000) newTier = 'GOLD';
    else if (newPoints >= 1000) newTier = 'SILVER';

    // Cập nhật User và lưu Lịch sử điểm
    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          points: newPoints,
          tier: newTier,
          lastCheckIn: new Date()
        }
      }),
      this.prisma.pointHistory.create({
        data: {
          userId,
          points: checkInPoints,
          reason: 'Điểm danh hàng ngày'
        }
      })
    ]);
  }
}
