import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductModule, CartModule, OrderModule, CategoryModule, ReviewModule, UserModule, SettingModule, CouponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
