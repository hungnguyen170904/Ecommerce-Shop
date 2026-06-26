import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Bật kiểm tra tính hợp lệ dữ liệu (Class Validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Mở luồng gọi API từ các domain khác (như React ở cổng 5173)
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
