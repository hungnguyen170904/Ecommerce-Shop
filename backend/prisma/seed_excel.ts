import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Bắt đầu đọc dữ liệu sản phẩm...');
  
  // Đọc file json
  const jsonPath = path.join(__dirname, '../../danh_sach_san_pham_cong_nghe.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error('Không tìm thấy file danh_sach_san_pham_cong_nghe.json');
  }

  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const productsData = JSON.parse(fileContent);

  console.log(`Đã đọc ${productsData.length} sản phẩm. Tiến hành xử lý...`);

  // Tạo kho hàng tổng để lưu tồn kho nếu chưa có
  let warehouse = await prisma.warehouse.findFirst({ where: { name: 'Kho Trung Tâm' } });
  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
      data: {
        name: 'Kho Trung Tâm',
        location: 'Hà Nội'
      }
    });
  }

  for (const item of productsData) {
    const rawCategory = item['Danh mục']?.toString().trim();
    const rawBrand = item['Nhãn hàng']?.toString().trim();
    const name = item['Tên sản phẩm']?.toString().trim();
    const spCode = item['Mã SP']?.toString().trim() || Date.now().toString();
    const rawPrice = item['Giá gốc (VNĐ)'];
    const rawSalePrice = item['Giá khuyến mãi (VNĐ)'];
    const variantConfig = item['Phiên bản / Cấu hình']?.toString().trim() || 'Mặc định';
    const shortDesc = item['Mô tả ngắn']?.toString().trim() || '';
    const stockStr = item['Tồn kho'];
    const statusStr = item['Trạng thái']?.toString().trim();

    if (!name || !rawPrice) continue; // Bỏ qua dòng thiếu dữ liệu chính

    const basePrice = Number(rawPrice);
    const salePrice = rawSalePrice ? Number(rawSalePrice) : null;
    const stock = Number(stockStr) || 0;
    const isActive = statusStr === 'Còn hàng' || stock > 0;
    
    // Tạo slug từ tên
    const slug = name.toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
      
    const finalSlug = `${slug}-${spCode.toLowerCase()}`;

    // 1. Tạo Category
    let category = null;
    if (rawCategory) {
      const catSlug = rawCategory.toLowerCase().replace(/\s+/g, '-');
      category = await prisma.category.upsert({
        where: { name: rawCategory },
        update: {},
        create: {
          name: rawCategory,
          slug: catSlug,
        }
      });
    }

    // 2. Tạo Brand
    let brand = null;
    if (rawBrand) {
      brand = await prisma.brand.upsert({
        where: { name: rawBrand },
        update: {},
        create: { name: rawBrand }
      });
    }

    // 3. Xử lý placeholder ảnh
    const placeholderUrl = `https://placehold.co/600x600/E2E8F0/1E293B?text=${encodeURIComponent(name.substring(0, 15))}`;

    // 4. Tạo Product
    const existingProduct = await prisma.product.findUnique({ where: { slug: finalSlug } });
    if (existingProduct) {
      console.log(`Sản phẩm ${name} đã tồn tại, bỏ qua tạo mới.`);
      continue;
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        slug: finalSlug,
        description: shortDesc,
        basePrice: basePrice,
        brandId: brand?.id,
        isActive: isActive,
        images: {
          create: [{ url: placeholderUrl, isPrimary: true }]
        },
        categories: category ? {
          create: [{ categoryId: category.id }]
        } : undefined,
        variants: {
          create: [{
            sku: spCode,
            size: variantConfig,
            price: salePrice, // Khuyến mãi override basePrice ở cấp Variant
            isActive: isActive
          }]
        }
      },
      include: { variants: true }
    });

    // 5. Thêm Tồn kho (InventoryTransaction)
    if (stock > 0 && product.variants.length > 0) {
      const variant = product.variants[0];
      await prisma.inventoryTransaction.create({
        data: {
          warehouseId: warehouse.id,
          variantId: variant.id,
          type: 'IN',
          quantity: stock,
          notes: 'Nhập dữ liệu từ Excel'
        }
      });
    }

    console.log(`Đã thêm: ${name} (${spCode})`);
  }

  console.log('✅ Hoàn tất nhập dữ liệu Excel vào hệ thống!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi chạy seed_excel:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
