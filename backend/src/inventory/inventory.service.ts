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
    // Get all variants and calculate their current stock
    const variants = await this.prisma.productVariant.findMany({
      include: {
        product: { select: { name: true, slug: true } },
        inventoryTransactions: true
      }
    });

    return variants.map(v => {
      // Calculate stock based on event sourcing
      const stock = v.inventoryTransactions.reduce((total, t) => {
        if (t.type === 'IN') return total + t.quantity;
        if (t.type === 'OUT') return total - Math.abs(t.quantity);
        if (t.type === 'ADJUSTMENT') return total + t.quantity; // Can be negative or positive
        return total;
      }, 0);

      return {
        id: v.id,
        productId: v.productId,
        productName: v.product.name,
        sku: v.sku,
        color: v.color,
        size: v.size,
        price: v.price,
        stock: stock
      };
    });
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
