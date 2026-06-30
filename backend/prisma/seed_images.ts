import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categoryImages: Record<string, string[]> = {
  'dien-thoai': [
    'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=800', // Smartphone 1
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800', // Smartphone 2
    'https://images.unsplash.com/photo-1533228100845-08145b01de14?q=80&w=800', // Smartphone 3
  ],
  'laptop': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800', // Laptop 1
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800', // Laptop 2 (MacBook)
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800', // Laptop 3
  ],
  'tai-nghe': [
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800', // Headphone 1
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800', // Earbuds 1
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800', // Headphone 2
  ],
  'ban-phim': [
    'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800', // Keyboard 1
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800', // Keyboard 2
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800', // Keyboard 3
  ],
  'chuot': [
    'https://images.unsplash.com/photo-1527814050087-379381547994?q=80&w=800', // Mouse 1
    'https://images.unsplash.com/photo-1615663245857-ac1eeb5304ba?q=80&w=800', // Mouse 2
    'https://images.unsplash.com/photo-1552831388-6a0b35077328?q=80&w=800', // Mouse 3
  ],
  'may-tinh-bang': [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800', // Tablet 1
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=800', // Tablet 2
  ],
  'man-hinh': [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', // Monitor 1
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', // Monitor 2
  ],
};

const defaultImage = 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800'; // Default tech image

async function main() {
  console.log('Bắt đầu cập nhật hình ảnh sản phẩm...');

  // Lấy tất cả sản phẩm cùng với danh mục của chúng
  const products = await prisma.product.findMany({
    include: {
      categories: {
        include: { category: true }
      },
      images: true
    }
  });

  console.log(`Tìm thấy ${products.length} sản phẩm. Tiến hành xử lý...`);

  let updatedCount = 0;

  for (const product of products) {
    // Xác định danh mục chính của sản phẩm
    let catSlug = 'other';
    if (product.categories && product.categories.length > 0) {
      catSlug = product.categories[0].category.slug;
    }

    // Chọn một ảnh ngẫu nhiên từ thư viện tương ứng với danh mục
    let newImageUrl = defaultImage;
    if (categoryImages[catSlug]) {
      const imagesArray = categoryImages[catSlug];
      newImageUrl = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    } else {
      // Thử đoán dựa trên tên nếu không có danh mục hợp lệ
      const nameLower = product.name.toLowerCase();
      if (nameLower.includes('iphone') || nameLower.includes('galaxy') || nameLower.includes('điện thoại')) {
        newImageUrl = categoryImages['dien-thoai'][Math.floor(Math.random() * categoryImages['dien-thoai'].length)];
      } else if (nameLower.includes('macbook') || nameLower.includes('laptop')) {
        newImageUrl = categoryImages['laptop'][Math.floor(Math.random() * categoryImages['laptop'].length)];
      } else if (nameLower.includes('tai nghe') || nameLower.includes('airpods') || nameLower.includes('buds')) {
        newImageUrl = categoryImages['tai-nghe'][Math.floor(Math.random() * categoryImages['tai-nghe'].length)];
      }
    }

    // Xóa tất cả ảnh cũ của sản phẩm này (ảnh placeholder)
    await prisma.productImage.deleteMany({
      where: { productId: product.id }
    });

    // Thêm ảnh mới
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: newImageUrl,
        isPrimary: true,
      }
    });

    updatedCount++;
    console.log(`Đã cập nhật ảnh cho: ${product.name}`);
  }

  console.log(`✅ Hoàn tất! Đã cập nhật ảnh cho ${updatedCount} sản phẩm.`);
}

main()
  .catch((e) => {
    console.error('Lỗi khi chạy seed_images:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
