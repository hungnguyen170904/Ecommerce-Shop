import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Bắt đầu thêm dữ liệu mẫu...');

  // 1. Cập nhật/Thêm danh mục
  const categoriesData = [
    { name: 'Điện thoại di động', slug: 'dien-thoai-di-dong', description: 'Smartphone chính hãng' },
    { name: 'Laptop & Macbook', slug: 'laptop-macbook', description: 'Máy tính xách tay cấu hình cao' },
    { name: 'Phụ kiện công nghệ', slug: 'phu-kien-cong-nghe', description: 'Tai nghe, cáp sạc' },
    { name: 'Máy tính bảng', slug: 'may-tinh-bang', description: 'iPad, Tablet Android' },
    { name: 'Chuột & Bàn phím', slug: 'chuot-ban-phim', description: 'Gaming gear, văn phòng' },
  ];

  for (const c of categoriesData) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  const allCategories = await prisma.category.findMany();

  const getCatId = (slug: string) => allCategories.find(c => c.slug === slug)?.id;

  // 2. Thêm Sản phẩm
  const productsData = [
    // Phones
    {
      name: 'Xiaomi 14 Pro 5G',
      slug: 'xiaomi-14-pro',
      description: 'Siêu phẩm nhà Xiaomi với camera Leica, chip Snapdragon 8 Gen 3 và sạc siêu tốc 120W.',
      basePrice: 22990000,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=800',
      categoryId: getCatId('dien-thoai-di-dong'),
      variants: ['Đen', 'Trắng', 'Xanh lá']
    },
    {
      name: 'Oppo Find X7 Ultra',
      slug: 'oppo-find-x7-ultra',
      description: 'Camera Hasselblad đỉnh cao nhiếp ảnh di động, màn hình AMOLED 2K+ siêu sắc nét.',
      basePrice: 24990000,
      image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800',
      categoryId: getCatId('dien-thoai-di-dong'),
      variants: ['Xanh Dương', 'Đen']
    },
    {
      name: 'Huawei P60 Pro',
      slug: 'huawei-p60-pro',
      description: 'Thiết kế ngọc trai độc bản, camera XMAGE chụp đêm bá đạo.',
      basePrice: 20990000,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800',
      categoryId: getCatId('dien-thoai-di-dong'),
      variants: ['Trắng ngọc trai', 'Đen']
    },
    
    // Laptops
    {
      name: 'Laptop Gaming MSI Katana 15',
      slug: 'msi-katana-15',
      description: 'Sức mạnh vượt trội với Intel Core i7 thế hệ 13 và RTX 4060, sẵn sàng cân mọi tựa game AAA.',
      basePrice: 28990000,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800',
      categoryId: getCatId('laptop-macbook'),
      variants: ['Đen nhám']
    },
    {
      name: 'Dell XPS 15 9530',
      slug: 'dell-xps-15-9530',
      description: 'Chiếc laptop Windows hoàn hảo cho creator. Màn hình OLED 3.5K sắc nét, khung nhôm nguyên khối sang trọng.',
      basePrice: 54990000,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800',
      categoryId: getCatId('laptop-macbook'),
      variants: ['Bạc']
    },

    // Tablets
    {
      name: 'iPad Pro 11-inch M4 (2024)',
      slug: 'ipad-pro-11-m4',
      description: 'Mỏng nhất từ trước đến nay, trang bị chip M4 siêu mạnh và màn hình Ultra Retina XDR tuyệt đẹp.',
      basePrice: 28990000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800',
      categoryId: getCatId('may-tinh-bang'),
      variants: ['Space Black', 'Silver']
    },

    // Accessories
    {
      name: 'Chuột không dây Logitech G Pro X Superlight 2',
      slug: 'logitech-g-pro-x-superlight-2',
      description: 'Chuột gaming không dây nhẹ nhất thế giới nay đã có switch quang học và cổng Type-C.',
      basePrice: 3490000,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800',
      categoryId: getCatId('chuot-ban-phim'),
      variants: ['Đen', 'Trắng', 'Hồng']
    },
    {
      name: 'Bàn phím cơ Keychron Q1 Pro',
      slug: 'keychron-q1-pro',
      description: 'Bàn phím cơ custom không dây vỏ nhôm toàn khối nguyên khối, hỗ trợ QMK/VIA.',
      basePrice: 4890000,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800',
      categoryId: getCatId('chuot-ban-phim'),
      variants: ['Carbon Black', 'Silver Grey']
    },
    {
      name: 'Tai nghe Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      description: 'Vua chống ồn chủ động (ANC) thế hệ mới, thiết kế hoàn toàn khác biệt, âm thanh Hi-Res tuyệt hảo.',
      basePrice: 7990000,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800',
      categoryId: getCatId('phu-kien-cong-nghe'),
      variants: ['Đen', 'Bạc', 'Xanh Midnight']
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
      console.log(`Đã thêm sản phẩm: ${product.name}`);
    } else {
      console.log(`Sản phẩm đã tồn tại: ${p.name}`);
    }
  }

  console.log('✅ Hoàn tất thêm dữ liệu!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi chạy seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
