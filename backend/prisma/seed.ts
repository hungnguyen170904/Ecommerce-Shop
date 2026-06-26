import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Bắt đầu chạy Seed Data...');

  // 1. Tạo Tài khoản Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      name: 'Quản trị viên',
      role: 'ADMIN',
    },
  });
  console.log('Đã khởi tạo Admin:', admin.email);

  // 2. Tạo User thường
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@ecommerce.com' },
    update: {},
    create: {
      email: 'user@ecommerce.com',
      password: userPassword,
      name: 'Khách hàng Demo',
      phone: '0987654321',
      address: '123 Đường Nguyễn Huệ, Quận 1, TP HCM',
      role: 'USER',
    },
  });
  console.log('Đã khởi tạo User:', user.email);

  // 3. Tạo Danh mục (Categories)
  const categoriesData = [
    { name: 'Điện thoại di động', slug: 'dien-thoai-di-dong', description: 'Smartphone chính hãng' },
    { name: 'Laptop & Macbook', slug: 'laptop-macbook', description: 'Máy tính xách tay cấu hình cao' },
    { name: 'Phụ kiện công nghệ', slug: 'phu-kien-cong-nghe', description: 'Tai nghe, sạc dự phòng, cáp sạc' },
  ];

  for (const c of categoriesData) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  const allCategories = await prisma.category.findMany();
  console.log(`Đã khởi tạo ${allCategories.length} danh mục.`);

  // 4. Tạo Sản phẩm (Products)
  const productsData = [
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'iPhone 15 Pro Max là siêu phẩm mới nhất của Apple với khung Titanium siêu nhẹ, chip A17 Pro mạnh mẽ và camera tetraprism zoom quang 5x ấn tượng.',
      basePrice: 34990000,
      image: 'https://images.unsplash.com/photo-1696446701796-da6122539f5e?q=80&w=800',
      categoryId: allCategories.find(c => c.slug === 'dien-thoai-di-dong')?.id,
      variants: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen']
    },
    {
      name: 'MacBook Pro 14 M3 2023',
      slug: 'macbook-pro-14-m3',
      description: 'MacBook Pro 14 inch trang bị chip M3 siêu tốc, thiết kế tuyệt đẹp với màu Space Black mới, màn hình Liquid Retina XDR và thời lượng pin đáng kinh ngạc.',
      basePrice: 39990000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800',
      categoryId: allCategories.find(c => c.slug === 'laptop-macbook')?.id,
      variants: ['Space Black', 'Silver']
    },
    {
      name: 'Tai nghe Bluetooth AirPods Pro Gen 2',
      slug: 'airpods-pro-gen-2',
      description: 'AirPods Pro thế hệ 2 mang đến trải nghiệm âm thanh đột phá. Khả năng chống ồn chủ động (ANC) tốt gấp đôi, chế độ Xuyên Âm thích ứng thông minh.',
      basePrice: 6190000,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800',
      categoryId: allCategories.find(c => c.slug === 'phu-kien-cong-nghe')?.id,
      variants: ['Trắng']
    },
    {
      name: 'Samsung Galaxy S24 Ultra 5G 512GB',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Galaxy S24 Ultra đánh dấu kỷ nguyên AI mới trên điện thoại thông minh. Khung viền Titanium bền bỉ, màn hình phẳng hoàn toàn và sức mạnh từ chip Snapdragon 8 Gen 3 for Galaxy.',
      basePrice: 37490000,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800',
      categoryId: allCategories.find(c => c.slug === 'dien-thoai-di-dong')?.id,
      variants: ['Xám Titanium', 'Đen Titanium', 'Tím Titanium']
    }
  ];

  for (const p of productsData) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      const product = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          basePrice: p.basePrice,
          images: {
            create: [{ url: p.image, isPrimary: true }]
          },
          categories: p.categoryId ? {
            create: [{ categoryId: p.categoryId }]
          } : undefined,
          variants: {
            create: p.variants.map(color => ({
              sku: `${p.slug}-${color}`.replace(/\s+/g, '-').toLowerCase(),
              price: p.basePrice,
              color: color
            }))
          }
        }
      });
      console.log(`Đã tạo sản phẩm: ${product.name}`);
    }
  }

  // 5. Tạo Settings cơ bản
  const defaultSettings = [
    { key: 'bankName', value: 'Vietcombank' },
    { key: 'bankAccount', value: '1234567890' },
    { key: 'bankAccountName', value: 'CONG TY TNHH ECOMMERCE' },
    { key: 'bannerUrl1', value: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1200' },
    { key: 'bannerUrl2', value: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1200' },
  ];

  for (const s of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: {}, // Only create if not exist
      create: s
    });
  }
  console.log('Đã thiết lập System Settings.');

  // 6. Tạo Coupon
  await prisma.coupon.upsert({
    where: { code: 'WELCOME2026' },
    update: {},
    create: {
      code: 'WELCOME2026',
      description: 'Giảm 20% chào mừng thành viên mới (Tối đa 1.000.000đ)',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      maxDiscount: 1000000,
      minOrderValue: 5000000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2026-12-31'),
      usageLimit: 100,
      isActive: true
    }
  });
  console.log('Đã tạo mã giảm giá WELCOME2026.');

  console.log('✅ Hoàn tất Seed Data!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi chạy seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
