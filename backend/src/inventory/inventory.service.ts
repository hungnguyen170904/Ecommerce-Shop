import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService implements OnModuleInit {
  private defaultWarehouseId: string;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Ensure at least one warehouse exists
    let warehouse = await this.prisma.warehouse.findFirst();
    if (!warehouse) {
      warehouse = await this.prisma.warehouse.create({
        data: {
          name: 'Kho Tổng Hà Nội',
          location: 'Hà Nội, Việt Nam'
        }
      });
    }
    this.defaultWarehouseId = warehouse.id;
  }

  async getInventory() {
    // Dùng SQL SUM để tính tồn kho trực tiếp trên Database, không load dữ liệu về Node.js
    const variants = await this.prisma.productVariant.findMany({
      include: {
        product: { select: { name: true, slug: true } },
      }
    });

    // Tính tồn kho bằng groupBy trực tiếp trên DB
    const stockSums = await this.prisma.inventoryTransaction.groupBy({
      by: ['variantId'],
      _sum: { quantity: true }
    });

    const stockMap = new Map(stockSums.map(s => [s.variantId, s._sum.quantity || 0]));

    return variants.map(v => ({
      id: v.id,
      productId: v.productId,
      productName: v.product.name,
      sku: v.sku,
      color: v.color,
      size: v.size,
      price: v.price,
      stock: stockMap.get(v.id) ?? 0
    }));
  }

  async addStock(variantId: string, quantity: number, notes?: string) {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    return this.prisma.inventoryTransaction.create({
      data: {
        warehouseId: this.defaultWarehouseId,
        variantId,
        type: 'IN',
        quantity: quantity,
        notes: notes || 'Nhập kho thủ công'
      }
    });
  }

  async processOrderCheckout(orderId: string, items: { variantId: string, quantity: number }[]) {
    // This is called when an order is successfully placed to reduce stock
    const transactions = items.map(item => ({
      warehouseId: this.defaultWarehouseId,
      variantId: item.variantId,
      type: 'OUT' as const,
      quantity: -Math.abs(item.quantity), // negative for OUT
      referenceId: orderId,
      notes: `Xuất kho cho đơn hàng ${orderId.split('-')[0].toUpperCase()}`
    }));

    await this.prisma.inventoryTransaction.createMany({
      data: transactions
    });
  }
}
