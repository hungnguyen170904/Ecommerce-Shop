import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createReview(@Request() req: any, @Body() body: { productId: string, rating: number, comment: string }) {
    return this.reviewService.createReview(req.user.userId, body.productId, body.rating, body.comment);
  }

  @Get('product/:productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewService.getReviewsByProduct(productId);
  }
}
