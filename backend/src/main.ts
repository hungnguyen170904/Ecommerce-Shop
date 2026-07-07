import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Bật kiểm tra tính hợp lệ dữ liệu (Class Validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Mở luồng gọi API từ các domain khác (như React ở cổng 5173)
  app.enableCors();

  // Bảo vệ HTTP Headers chống XSS, Clickjacking...
  app.use(helmet({
    crossOriginResourcePolicy: false, // Cho phép Frontend (khác port) load ảnh tĩnh từ Backend
  }));
  // Nén payload (Gzip) để giảm dung lượng tải
  app.use(compression());

  // Cấu hình phục vụ file tĩnh cho thư mục uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
