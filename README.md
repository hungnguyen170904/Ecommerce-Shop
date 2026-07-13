<div align="center">
  <h1>Tech E-Commerce Platform</h1>
  <p>Hệ thống Thương mại điện tử B2C chuyên kinh doanh thiết bị công nghệ. Tích hợp phân hệ ERP quản lý kho, hệ thống khuyến mãi động và Trợ lý ảo AI.</p>

  <p>
    <img src="https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.0-646CFF.svg?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/NestJS-11-E0234E.svg?style=flat-square&logo=nestjs" alt="NestJS" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748.svg?style=flat-square&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-336791.svg?style=flat-square&logo=postgresql" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Gemini_AI-Flash-8E75B2.svg?style=flat-square&logo=google" alt="Gemini AI" />
  </p>
</div>

---

## 1. Tổng quan hệ thống (System Overview)

Dự án là một nền tảng thương mại điện tử cấp độ doanh nghiệp, được thiết kế theo kiến trúc Module hóa (Clean Architecture) trên Backend và Component-based UI trên Frontend. Trọng tâm của hệ thống giải quyết các bài toán cốt lõi trong vận hành E-Commerce: xử lý giao dịch đồng thời (concurrency), quản lý vòng đời tồn kho (inventory lifecycle), phân quyền bảo mật và tích hợp AI nâng cao trải nghiệm mua sắm.

---

## 2. Các module & Chức năng cốt lõi (Core Modules)

### 2.1. Xác thực & Phân quyền (Auth & Security)
- **JWT Authentication:** Cơ chế Access Token & Refresh Token an toàn.
- **Role-based Access Control (RBAC):** Phân định rõ ràng quyền `USER` và `ADMIN`.
- **User Profile:** Quản lý sổ địa chỉ (Multiple Addresses), lịch sử tích điểm (Loyalty Points) và hạng thành viên.

### 2.2. Quản lý Danh mục & Sản phẩm (Catalog Management)
- **Cấu trúc dữ liệu linh hoạt:** Hỗ trợ Danh mục đa cấp (Nested Categories) và Thương hiệu (Brands).
- **Hệ thống Biến thể (Variants):** Mỗi sản phẩm có nhiều biến thể độc lập với SKU, giá bán (price override), kích thước và màu sắc riêng biệt.
- **Tối ưu hiển thị:** Tích hợp Skeleton Loading, Promise.all cho luồng fetch dữ liệu, UI Glassmorphism hiện đại.

### 2.3. Giỏ hàng & Xử lý Đơn hàng (Cart & Order Processing)
- **Kiểm tra tồn kho thời gian thực (Real-time Inventory Check):** Chặn đặt hàng vượt quá số lượng tồn kho (Race-condition protection).
- **Vòng đời đơn hàng (Order Lifecycle):** Quản lý trạng thái chi tiết (`PENDING` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED`).
- **Giao vận (Shipment):** Theo dõi mã vận đơn (Tracking number), phí ship và trạng thái giao hàng.
- **Thanh toán (Payment):** Hỗ trợ nhiều phương thức (COD, Chuyển khoản QR với Provider Ref ID). Theo dõi giao dịch (Payment Transactions).

### 2.4. Phân hệ ERP Quản lý Kho (Inventory Management)
- **Đa điểm kho (Multi-warehouse):** Hỗ trợ khai báo nhiều kho hàng.
- **Nhà cung cấp & Nhập hàng (Suppliers & PO):** Tạo Đơn đặt hàng (Purchase Orders) từ nhà cung cấp.
- **Sổ cái tồn kho (Inventory Transactions):** Không trừ số lượng đơn thuần. Mọi thay đổi tồn kho đều được ghi nhận dạng Log (`IN`, `OUT`, `ADJUSTMENT`) đảm bảo tính minh bạch và dễ dàng truy xuất (Audit).

### 2.5. Tương tác & Khuyến mãi (Promotions & Engagement)
- **Mã giảm giá (Coupon Engine):** Hỗ trợ giảm theo % hoặc số tiền cố định. Có giới hạn lượt dùng hệ thống (`usageLimit`), áp dụng min-order, tự động chặn sử dụng mã nhiều lần (1 user/1 mã).
- **Hệ thống Đánh giá (Reviews):** Ràng buộc cấp Database (Unique Constraint) đảm bảo 1 user chỉ được đánh giá 1 lần trên 1 sản phẩm (chống Spam).
- **In-app Notifications:** Đẩy thông báo hệ thống, trạng thái đơn hàng tới người dùng.

### 2.6. Trợ lý ảo AI (AI Chatbot Integration)
- **Kiến trúc RAG (Retrieval-Augmented Generation) cơ bản:** Sử dụng Google Gemini AI (3.5 Flash).
- **Context-aware:** Tự động lấy danh sách sản phẩm nổi bật (Top 10) từ Database, nhúng vào System Prompt để AI tư vấn chính xác tên, giá và tình trạng hàng hóa.
- **Xử lý linh hoạt:** Tư vấn sản phẩm thay thế khi hết hàng, giải đáp chính sách bảo hành, đổi trả tự động. Hỗ trợ Fallback (Mock Mode) khi thiếu API Key.

---

## 3. Kiến trúc Công nghệ (Tech Stack)

### Frontend (Client)
- **Framework:** React 19 (TypeScript, Vite).
- **State Management:** Zustand (Store phân mảnh: Auth, Cart, Compare, Settings).
- **Network:** Axios (Interceptors xử lý logic Authentication JWT).
- **Styling & UI:** Tailwind CSS v4, Lucide React (Icons), Framer Motion (Animations).

### Backend (Server)
- **Framework:** NestJS 11 (TypeScript, Dependency Injection, Clean Architecture).
- **Database & ORM:** PostgreSQL 16 + Prisma ORM.
- **AI Integration:** `@google/generative-ai` (Gemini API).
- **Performance & Security:**
  - `Helmet` (Bảo mật HTTP Headers).
  - `Throttler` (API Rate Limiting - chống DDoS).
  - `Compression` (Nén Payload).
  - `Cache-Manager` (In-memory caching).
- **Database Optimization:** Sử dụng `Composite Indexes` và `Unique Constraints` ngăn chặn lỗi Race Condition (Ví dụ: `[userId, productId]` trong Review).

---

## 4. Hướng dẫn cài đặt (Installation Guide)

### 4.1. Yêu cầu hệ thống
- Node.js (v18.x+)
- PostgreSQL (Local hoặc Cloud)

### 4.2. Khởi chạy Backend
```bash
cd backend
npm install
```

Tạo cấu hình `.env` trong thư mục `backend`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
GEMINI_API_KEY="your-google-gemini-api-key" # Tùy chọn (Cho tính năng Chatbot)
```

Tạo lược đồ cơ sở dữ liệu và nạp dữ liệu mẫu:
```bash
npx prisma db push
npm run seed:excel
```

Chạy Server:
```bash
npm run start:dev
```
*(API khởi chạy tại: `http://localhost:3000`)*

### 4.3. Khởi chạy Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Ứng dụng khởi chạy tại: `http://localhost:5173`)*

---

## 5. Cấu trúc thư mục mã nguồn (Directory Structure)

```text
EcommerceWeb/
├── backend/
│   ├── prisma/               # Schema định nghĩa Database, Migrations & Dữ liệu Seed
│   ├── src/                  
│   │   ├── auth/             # Logic xác thực JWT, Phân quyền Guards
│   │   ├── chatbot/          # Module tích hợp Gemini AI Chatbot
│   │   ├── inventory/        # Module quản lý kho ERP (Transactions, PO)
│   │   ├── order/            # Vòng đời đơn hàng, Checkout, Giao vận
│   │   ├── product/          # Quản lý danh mục, biến thể sản phẩm, đánh giá
│   │   └── settings/         # Quản lý cấu hình động (Logo, Banner)
│   └── uploads/              # Lưu trữ File tĩnh (Local storage)
│
└── frontend/
    ├── src/
    │   ├── api/              # Tầng giao tiếp mạng (Axios Instance)
    │   ├── components/       # UI Components tái sử dụng (Chatbot, Navbar, Card...)
    │   ├── pages/            # View Controller cho các Route (Home, Admin, Cart...)
    │   └── store/            # Tầng quản lý trạng thái toàn cục (Zustand)
    └── index.css             # Tailwind Design Tokens & Utilities
```
