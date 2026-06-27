import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventory() {
    return this.inventoryService.getInventory();
  }

  @Post('add')
  addStock(@Body() body: { variantId: string, quantity: number, notes?: string }) {
    return this.inventoryService.addStock(body.variantId, body.quantity, body.notes);
  }
}
