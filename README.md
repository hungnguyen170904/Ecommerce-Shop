<div align="center">
  <h1>🛒 Tech E-Commerce Platform</h1>
  <p>Hệ thống bán hàng trực tuyến thiết bị công nghệ toàn diện với kiến trúc Micro-services ready, ERP tích hợp và giao diện Modern Web 2025.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.0-646CFF.svg?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/NestJS-11-E0234E.svg?style=for-the-badge&logo=nestjs" alt="NestJS" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748.svg?style=for-the-badge&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-336791.svg?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  </p>
</div>

<br />

Chào mừng bạn đến với dự án **Tech E-Commerce Platform** - một nền tảng thương mại điện tử cấp độ doanh nghiệp (Enterprise-level), được thiết kế đặc biệt cho việc kinh doanh các thiết bị công nghệ (Điện thoại, Laptop, Tai nghe, Smartwatch...). Hệ thống không chỉ có giao diện tuyệt đẹp (UX/UI tối ưu) mà còn sở hữu một Backend mạnh mẽ với các module quản lý kho (ERP), điểm thưởng (Loyalty) và mã giảm giá (Coupon) phức tạp.

---

## 📑 Mục lục

- [🌟 Chức năng cốt lõi (Core Features)](#-chức-năng-cốt-lõi-core-features)
- [🏗️ Kiến trúc & Công nghệ](#-kiến-trúc--công-nghệ)
- [🚀 Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)

---

## 🌟 Chức năng cốt lõi (Core Features)

### 🛍️ Storefront (Dành cho Khách hàng)
- **UI/UX Đột phá:** Giao diện **Modern Web 2025** với Glassmorphism, Hero Slider mượt mà, hiệu ứng nổi (shimmer/float) và Skeleton Loading chuyên nghiệp. Đảm bảo tốc độ tải trang cực nhanh nhờ cơ chế fetch API song song (Promise.all).
- **Trải nghiệm mua sắm:**
  - Danh mục sản phẩm công nghệ đa dạng với bộ lọc thông minh (Brand, Category).
  - Chi tiết sản phẩm với hệ thống **Biến thể (Variants)** phức tạp (Màu sắc, Dung lượng, SKU riêng biệt, Giá tùy chỉnh).
  - So sánh sản phẩm (Compare) và Danh sách yêu thích (Wishlist).
- **Giỏ hàng & Thanh toán:**
  - Kiểm tra tồn kho **Real-time** ngay khi người dùng thao tác thêm vào giỏ hoặc thanh toán.
  - Hỗ trợ nhiều phương thức thanh toán (COD, Chuyển khoản QR Code với Provider Ref ID).
- **Tương tác & Khuyến mãi:**
  - Hệ thống áp dụng **Coupon thông minh** (Giảm theo % hoặc số tiền cố định, giới hạn lượt dùng toàn hệ thống, tự động chặn spam).
  - Đánh giá sản phẩm (Review) với ràng buộc dữ liệu chặt chẽ (1 user chỉ được đánh giá 1 lần cho 1 sản phẩm).
  - Tích điểm thưởng (Loyalty Points) và Hạng thành viên (Tiers).
- **Cá nhân hóa:** Quản lý sổ địa chỉ giao hàng (Multiple Addresses), lịch sử đơn hàng chi tiết và hệ thống thông báo trong ứng dụng (In-app Notifications).

### 🏢 Admin Panel & ERP (Dành cho Quản trị viên)
- **Dashboard Thống kê:** Báo cáo doanh thu, số lượng đơn hàng, và tăng trưởng khách hàng theo thời gian thực.
- **Quản lý Kho hàng (Inventory ERP):**
  - Quản lý đa kho (Warehouses).
  - Quản lý Nhà cung cấp (Suppliers) và Tạo Đơn đặt hàng nhập kho (Purchase Orders - PO).
  - Ghi nhận lịch sử giao dịch kho (Inventory Transactions: IN, OUT, ADJUSTMENT) để đảm bảo tính toàn vẹn dữ liệu, không dùng phép tính trừ đơn thuần.
- **Quản lý Đơn hàng & Vận chuyển:**
  - Theo dõi vòng đời đơn hàng (Pending -> Processing -> Shipped -> Delivered -> Cancelled).
  - Tích hợp Module Giao hàng (Shipment) với Mã vận đơn (Tracking Number) và Đơn vị vận chuyển (Courier).
  - Quy trình hoàn trả hàng (Return/Refund) chuẩn chỉ.
- **Quản lý Hệ thống (Dynamic Settings):**
  - Thay đổi cấu hình trang web (Tên Website, Logo, Banner quảng cáo) trực tiếp trên giao diện Admin, không cần can thiệp code. (Sử dụng module Upload File lưu trữ tại backend).

---

## 🏗️ Kiến trúc & Công nghệ

### Frontend (Client-side)
* **Core:** React 19, TypeScript, Vite (Tốc độ build siêu tốc).
* **Styling:** Tailwind CSS v4 (Custom Theme Tokens: `color-brand-bg`, `shadow-soft`, animations custom).
* **State Management:** Zustand (Nhẹ, dễ scale cho Auth, Cart, Compare).
* **Network & Data:** Axios (Interceptors xử lý Refresh Token, Authorization).
* **Icons & Animation:** Lucide React, Framer Motion.

### Backend (Server-side)
* **Core:** NestJS 11, TypeScript (Kiến trúc Controller-Service-Module cực kỳ Clean).
* **Database & ORM:** PostgreSQL 16, Prisma ORM (Type-safe query).
* **Authentication:** Passport, JWT (JSON Web Tokens) với cơ chế Access/Refresh Token bảo mật cao.
* **Hiệu năng & Bảo mật:**
  - Helmet (Security headers).
  - Compression (Nén response).
  - Throttler (API Rate Limiting chống DDoS).
  - Cache-Manager (Tối ưu truy vấn).
* **Tối ưu Cơ sở dữ liệu:**
  - Đã đánh **Composite Indexes** (`@@index`) cho các bảng dữ liệu lớn (Orders, Transactions).
  - Sử dụng **Unique Constraints** (`@@unique([userId, productId])`, `@@unique([userId, couponId])`) để chặn lỗi Race Condition từ cấp độ Database.

---

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu môi trường
- Node.js (v18.x trở lên)
- PostgreSQL (Local hoặc Neon/Supabase)

### 2. Cài đặt Backend
Mở terminal, di chuyển vào thư mục `backend`:
```bash
cd backend
npm install
```

Tạo file `.env` ở thư mục `backend`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

Khởi tạo Database và Seed dữ liệu mẫu (Sản phẩm công nghệ, User admin):
```bash
npx prisma db push
npm run seed:excel
```

Chạy server Backend:
```bash
npm run start:dev
```
*API sẽ chạy tại: `http://localhost:3000`*

### 3. Cài đặt Frontend
Mở một terminal mới, di chuyển vào thư mục `frontend`:
```bash
cd frontend
npm install
```

Chạy server Frontend:
```bash
npm run dev
```
*Giao diện sẽ chạy tại: `http://localhost:5173`*

---

## 📁 Cấu trúc thư mục

```text
EcommerceWeb/
├── backend/                  # NestJS API Server
│   ├── prisma/               # Schema, Migrations & Seeders (Excel Data)
│   ├── src/                  
│   │   ├── auth/             # Xác thực (JWT, Guards)
│   │   ├── product/          # API Sản phẩm, Biến thể, Danh mục
│   │   ├── order/            # API Đơn hàng, Checkout
│   │   ├── inventory/        # Logic ERP quản lý kho hàng
│   │   └── settings/         # Cấu hình website động
│   └── uploads/              # Lưu trữ hình ảnh tĩnh (Logo, Banners)
│
└── frontend/                 # React UI Application
    ├── src/
    │   ├── api/              # Axios instance setup
    │   ├── components/       # Reusable UI components (Navbar, Footer, ProductCard)
    │   ├── pages/            # Page layouts (Home, Admin, Product Details)
    │   └── store/            # Zustand global state (Auth, Cart, Compare)
    └── index.css             # Tailwind v4 configuration & Custom Animations
```

<br />
<div align="center">
  <i>Được phát triển với niềm đam mê mang lại trải nghiệm thương mại điện tử hoàn hảo!</i>
</div>
