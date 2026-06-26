import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: string, productId: string, rating: number, comment: string) {
    // 1. Kiểm tra xem User đã mua sản phẩm này và đơn hàng đã hoàn thành (DELIVERED) chưa
    const hasBought = await this.prisma.order.findFirst({
      where: {
        userId,
        status: 'DELIVERED',
        items: {
          some: {
            variant: {
              productId
            }
          }
        }
      }
    });

    if (!hasBought) {
      throw new BadRequestException('Bạn chỉ có thể đánh giá sản phẩm sau khi đã mua và nhận hàng thành công.');
    }

    // 2. Tạo Review
    return this.prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment
      }
    });
  }

  async getReviewsByProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
