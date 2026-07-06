import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
    } else {
      this.logger.warn('GEMINI_API_KEY không được tìm thấy. Trợ lý AI sẽ chạy ở chế độ giả lập (Mock Mode).');
    }
  }

  async processMessage(message: string): Promise<string> {
    if (!this.model) {
      // Chế độ Mock nếu không có API Key
      return this.fallbackResponse(message);
    }

    try {
      // 1. Lấy thông tin ngữ cảnh từ Database (Ví dụ: Lấy 10 sản phẩm nổi bật nhất)
      const products = await this.prisma.product.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          basePrice: true,
          description: true,
          brand: { select: { name: true } },
          categories: { select: { category: { select: { name: true } } } }
        }
      });

      // 2. Tạo nội dung tóm tắt để AI "học" nhanh về cửa hàng
      const productContext = products.map(p => 
        `- Sản phẩm: ${p.name}, Hãng: ${p.brand?.name || 'Đang cập nhật'}, Giá: ${p.basePrice} VND. Mô tả ngắn: ${p.description?.substring(0, 50)}...`
      ).join('\\n');

      // 3. System Prompt (Lệnh định hướng AI)
      const systemPrompt = `Bạn là trợ lý ảo AI chuyên nghiệp của một cửa hàng thương mại điện tử chuyên bán đồ công nghệ (Điện thoại, Laptop, Phụ kiện). 
      Tên bạn là "TechBot". Bạn cần trả lời lịch sự, ngắn gọn (dưới 100 chữ) và thân thiện.
      
      Dữ liệu quan trọng - Đây là danh sách các sản phẩm NỔI BẬT NHẤT đang bán tại cửa hàng:
      ${productContext}
      
      Nếu khách hàng hỏi về các sản phẩm này, hãy giới thiệu nhiệt tình kèm giá tiền (nhớ định dạng tiền tệ VNĐ). 
      Nếu khách hàng hỏi về sản phẩm không có trong danh sách trên, hãy bảo là "Dạ, hiện tại cửa hàng có thể chưa có sẵn mẫu này, nhưng bạn có thể tham khảo các dòng sản phẩm tuyệt vời khác như [Tên một sản phẩm trong danh sách] ạ."
      Nếu khách hỏi về chính sách, hãy trả lời là có bảo hành 12 tháng, đổi trả 7 ngày.
      
      Tin nhắn của khách hàng: "${message}"`;

      // 4. Gửi lên Gemini
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text();

    } catch (error) {
      this.logger.error('Lỗi khi gọi Gemini API:', error);
      return 'Dạ, hiện tại hệ thống AI của cửa hàng đang bận. Bạn vui lòng thử lại sau giây lát nhé!';
    }
  }

  private fallbackResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('giá') || lower.includes('rẻ')) {
      return 'Dạ (Chế độ giả lập vì chưa có API Key): Bên mình có rất nhiều sản phẩm giá tốt. Bạn vui lòng thêm biến GEMINI_API_KEY vào .env để tôi thông minh hơn nhé!';
    }
    return 'Dạ, tôi đang hoạt động ở chế độ giả lập vì hệ thống chưa được cấp GEMINI_API_KEY. Vui lòng thêm Key vào file .env ở Backend để tôi có thể tư vấn sản phẩm thật cho bạn nhé!';
  }
}
