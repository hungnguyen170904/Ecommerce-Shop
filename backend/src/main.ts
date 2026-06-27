import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Bật kiểm tra tính hợp lệ dữ liệu (Class Validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Mở luồng gọi API từ các domain khác (như React ở cổng 5173)
  app.enableCors();

  // Cấu hình phục vụ file tĩnh cho thư mục uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
