<div align="center">
  <h1>🛒 Modern Tech E-Commerce Platform</h1>
  <p>Hệ thống bán hàng trực tuyến thiết bị công nghệ hiện đại, hiệu năng cao và bảo mật.</p>

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

Chào mừng bạn đến với dự án **Tech E-Commerce Platform** - một nền tảng thương mại điện tử chuyên nghiệp, được tinh chỉnh tối đa về hiệu năng, bảo mật và trải nghiệm người dùng (UX/UI). Hệ thống áp dụng phong cách thiết kế **Modern Web 2025** với Glassmorphism, Animation mượt mà và Layout tối ưu.

---

## 📑 Mục lục

- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [🛠️ Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [🚀 Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [🏗️ Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [💡 Lưu ý](#-lưu-ý)

---

## ✨ Tính năng nổi bật

### 🛍️ Dành cho Khách hàng (Storefront)
- **Giao diện Modern Web 2025:** Tone màu xanh dương nhẹ nhàng, sử dụng Glassmorphism, Hero Slider tự động chạy, Animation cuộn trang và hover mượt mà.
- **Tối ưu tốc độ (Performance):** Gọi API song song (Promise.all) kết hợp với Skeleton Loading để giảm thời gian chờ lên đến 60%.
- **Chức năng Mua sắm Toàn diện:** 
  - Xem chi tiết sản phẩm, biến thể (Variants - màu sắc/kích thước).
  - Thêm vào Giỏ hàng (Cart) với kiểm tra tồn kho realtime.
  - Danh sách Yêu thích (Wishlist) và So sánh Sản phẩm (Compare).
- **Thanh toán & Đơn hàng:** Checkout an toàn, tự động tính giảm giá (Coupon), hủy đơn hàng, yêu cầu hoàn trả.
- **Đánh giá Sản phẩm:** Hệ thống chống spam, một người dùng chỉ được đánh giá 1 lần cho 1 sản phẩm.

### 🛡️ Dành cho Quản trị viên (Admin Panel)
- **Dashboard Thống kê:** Theo dõi doanh thu, số lượng đơn hàng, khách hàng mới theo thời gian thực.
- **Quản lý ERP Kho hàng:** Quản lý lượng tồn kho chính xác thông qua `InventoryTransaction`.
- **Cấu hình Hệ thống (Settings):** Đổi tên shop, Logo, Banner quảng cáo, Thông tin thanh toán (QR Code) trực tiếp từ giao diện không cần sửa code.
- **Quản lý Vận hành:** Xét duyệt đơn hàng, quản lý người dùng, thiết lập mã giảm giá (Coupon).

---

## 🛠️ Công nghệ sử dụng

### Frontend (Client-side)
* **Core:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS v4 (với Custom Theme Tokens)
* **State Management:** Zustand
* **Routing:** React Router v6
* **Icons & Animation:** Lucide React, Framer Motion
* **Network:** Axios (tích hợp Interceptors xử lý JWT Token)

### Backend (Server-side)
* **Core:** NestJS 11, TypeScript
* **Database & ORM:** PostgreSQL, Prisma ORM
* **Authentication:** Passport, JWT (JSON Web Tokens)
* **Hiệu năng & Bảo mật:** Helmet, Compression, API Rate Limiting (Throttler), Cache-Manager
* **Tối ưu DB:** Đã cấu hình Composite Indexes và Unique Constraints để chống Race Condition.

---

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu môi trường
- Node.js (v18.x trở lên)
- PostgreSQL (Đã cài đặt local hoặc sử dụng dịch vụ Cloud như Neon/Supabase)

### 2. Cài đặt Backend
Di chuyển vào thư mục `backend`:
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

Khởi tạo Database và Seed dữ liệu mẫu:
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

## 🏗️ Cấu trúc thư mục

```text
EcommerceWeb/
├── backend/                  # NestJS API Server
│   ├── prisma/               # Schema, Migrations & Seeders
│   ├── src/                  # Controllers, Services, Modules (Domain Driven)
│   └── uploads/              # Lưu trữ hình ảnh tĩnh (Logo, Banners)
│
└── frontend/                 # React UI Application
    ├── src/
    │   ├── api/              # Axios instance setup
    │   ├── components/       # Reusable UI components (Navbar, Footer, ProductCard)
    │   ├── pages/            # Page layouts (Home, Admin, Product Details)
    │   └── store/            # Zustand global state (Auth, Cart, Compare, Settings)
    └── index.css             # Tailwind v4 configuration & Custom Animations
```

---

## 💡 Lưu ý

- **Tài khoản mặc định:** Sau khi chạy Seed, bạn có thể kiểm tra file `backend/src/prisma/seed.ts` để lấy tài khoản Admin mặc định.
- **Upload Hình ảnh:** Các hình ảnh hệ thống (Logo, Banner) được quản lý qua `SettingsController` và lưu tại thư mục `backend/uploads`. Chúng được phục vụ dưới dạng file tĩnh `/uploads/...`.
- **Đồng bộ Schema:** Nếu bạn có thay đổi cấu trúc Database (`schema.prisma`), hãy nhớ chạy `npx prisma generate` và `npx prisma db push` để cập nhật.

<br />
<div align="center">
  <i>Được phát triển với niềm đam mê mang lại trải nghiệm thương mại điện tử hoàn hảo!</i>
</div>
