# 🚀 Modern E-Commerce Platform

Chào mừng bạn đến với dự án **E-Commerce Platform** - một hệ thống bán hàng trực tuyến hiện đại, mạnh mẽ và toàn diện, được xây dựng dựa trên những công nghệ web tiên tiến nhất năm 2025-2026.

Dự án áp dụng thiết kế theo phong cách **Minimalism** kết hợp với **Bento Grid** để mang lại trải nghiệm người dùng (UX/UI) mượt mà, chuyên nghiệp và tối ưu nhất.

---

## ✨ Điểm nổi bật (Features)

### Dành cho Người dùng (Customer Facing)
- 🛍️ **Giao diện Bento Grid:** Thiết kế lưới hiện đại, bo góc mềm mại, tạo điểm nhấn thị giác cực mạnh.
- 📱 **Responsive 100%:** Hiển thị hoàn hảo trên mọi kích thước màn hình (Mobile, Tablet, Desktop).
- 🔐 **Xác thực an toàn:** Đăng nhập, đăng ký bằng JWT.
- 🛒 **Giỏ hàng & Thanh toán:** Giỏ hàng mượt mà, hỗ trợ cấu hình thanh toán chuyển khoản (QR Code).
- 💖 **Tính năng tiện ích:** Danh sách yêu thích (Wishlist), So sánh sản phẩm (Compare).
- 🔍 **Tìm kiếm & Lọc:** Tìm kiếm nhanh chóng, lọc theo danh mục, nhãn hàng.

### Dành cho Quản trị viên (Admin Panel)
- 📊 **Dashboard Thống kê:** Theo dõi doanh thu, đơn hàng, khách hàng trực quan.
- 📦 **Quản lý Sản phẩm & Kho hàng (ERP):** Theo dõi số lượng tồn kho, nhập hàng, quản lý biến thể (Variants).
- ⚙️ **Cài đặt Hệ thống:** Cho phép thay đổi Tên shop, Logo, Banner quảng cáo và thông tin ngân hàng ngay từ giao diện Admin.
- 🧾 **Quản lý Đơn hàng:** Cập nhật trạng thái đơn hàng (Đang xử lý, Đang giao, Hoàn thành).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

### Frontend (Client-side)
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4 (Cấu hình custom utilities hiện đại)
- **State Management:** Zustand (Quản lý state siêu nhẹ, hiệu quả)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **HTTP Client:** Axios (Tích hợp Interceptors xử lý token)

### Backend (Server-side)
- **Framework:** NestJS 11 (Cấu trúc module hóa, Clean Architecture)
- **Database ORM:** Prisma (Type-safe database client)
- **Database:** PostgreSQL (Mạnh mẽ, hỗ trợ transaction và relation phức tạp)
- **Authentication:** Passport, JWT (JSON Web Tokens)
- **File Storage:** Multer (Upload và phục vụ file tĩnh/hình ảnh)

---

## 🚀 Hướng dẫn cài đặt (Getting Started)

### 1. Yêu cầu hệ thống
- Node.js (v18 trở lên)
- PostgreSQL (Đang chạy ở máy local hoặc server)
- Trình quản lý package: `npm` hoặc `yarn`

### 2. Cài đặt Backend
Di chuyển vào thư mục `backend` và cài đặt các thư viện:
```bash
cd backend
npm install
```

Cấu hình biến môi trường bằng cách tạo file `.env` ở thư mục `backend`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

Chạy Migration và khởi tạo dữ liệu mẫu (Seed):
```bash
npx prisma migrate dev --name init
npm run seed:excel
```

Chạy server Backend:
```bash
npm run start:dev
```
*(Server sẽ chạy tại `http://localhost:3000`)*

### 3. Cài đặt Frontend
Di chuyển vào thư mục `frontend` và cài đặt các thư viện:
```bash
cd frontend
npm install
```

Chạy server Frontend:
```bash
npm run dev
```
*(Giao diện sẽ chạy tại `http://localhost:5173`)*

---

## 🏗️ Cấu trúc thư mục chính (Folder Structure)

```text
EcommerceWeb/
├── backend/                  # Mã nguồn NestJS
│   ├── prisma/               # Database Schema & Seeders
│   ├── src/                  # Các module API (User, Product, Order, Settings...)
│   └── uploads/              # Nơi lưu trữ hình ảnh tải lên (Logo, Banner)
└── frontend/                 # Mã nguồn React
    ├── src/
    │   ├── api/              # Axios instance & cấu hình gọi API
    │   ├── components/       # Các UI components dùng chung (Navbar, Footer, Button...)
    │   ├── pages/            # Các trang giao diện (Home, Admin, ProductDetail...)
    │   └── store/            # Quản lý state bằng Zustand
    └── index.css             # Cấu hình Tailwind CSS v4
```

---

## 💡 Lưu ý
- Khi upload Logo hoặc Banner từ trang Quản trị, ảnh sẽ được lưu tự động vào thư mục `backend/uploads/` và được phục vụ công khai qua route tĩnh `/uploads/...`
- Tài khoản quản trị mặc định (sau khi chạy seed) hãy sử dụng email và mật khẩu được cấu hình trong file `seed.ts`.

---
*Phát triển với ❤️ cho trải nghiệm mua sắm tuyệt vời nhất!*
