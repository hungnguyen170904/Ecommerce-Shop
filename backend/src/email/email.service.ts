import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOrderConfirmation(email: string, order: any, user: any) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      this.logger.warn(`Chưa cấu hình EMAIL_USER và EMAIL_PASS trong .env. Bỏ qua việc gửi email cho ${email}`);
      return;
    }

    try {
      // Lấy Logo từ cài đặt
      const logoSetting = await this.prisma.systemSetting.findUnique({
        where: { key: 'logoUrl' }
      });
      const logoUrl = logoSetting?.value || '';

      const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount);
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          ${logoUrl ? `<div style="text-align: center; margin-bottom: 20px;"><img src="${logoUrl.startsWith('/') ? 'http://localhost:3000' + logoUrl : logoUrl}" alt="Logo" style="max-height: 80px;" /></div>` : ''}
          <h2 style="color: #4f46e5; text-align: center;">Cảm ơn bạn đã đặt hàng, ${user.name}!</h2>
          <p>Đơn hàng <strong>#${order.id.split('-')[0].toUpperCase()}</strong> của bạn đã được tiếp nhận và đang trong quá trình xử lý.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Thông tin giao hàng</h3>
            <p style="margin: 5px 0;"><strong>Địa chỉ:</strong> ${order.shippingAddress}</p>
            <p style="margin: 5px 0;"><strong>Số điện thoại:</strong> ${user.phone || 'Chưa cung cấp'}</p>
            <p style="margin: 5px 0;"><strong>Phương thức thanh toán:</strong> ${order.paymentMethod === 'ONLINE' ? 'Chuyển khoản / QR Code' : 'Thanh toán khi nhận hàng (COD)'}</p>
          </div>

          <h3 style="color: #1e293b;">Chi tiết đơn hàng</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                <th style="padding: 10px 0;">Sản phẩm</th>
                <th style="padding: 10px 0; text-align: center;">SL</th>
                <th style="padding: 10px 0; text-align: right;">Giá</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0;">
                    ${item.variant.product.name}
                    <div style="font-size: 12px; color: #64748b;">Phân loại: ${item.variant.color || item.variant.sku}</div>
                  </td>
                  <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px 0; text-align: right;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="text-align: right; font-size: 18px;">
            <strong>Tổng cộng: <span style="color: #4f46e5;">${formattedTotal}</span></strong>
          </div>

          <p style="margin-top: 30px; font-size: 14px; color: #64748b; text-align: center;">
            Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email này.
          </p>
        </div>
      `;

      await this.transporter.sendMail({
        from: `"Ecommerce Shop" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `[Xác nhận đơn hàng] Đơn hàng #${order.id.split('-')[0].toUpperCase()} thành công!`,
        html: htmlContent,
      });

      this.logger.log(`Đã gửi email xác nhận đơn hàng thành công đến ${email}`);
    } catch (error) {
      this.logger.error(`Lỗi khi gửi email xác nhận đơn hàng đến ${email}:`, error);
    }
  }
}
