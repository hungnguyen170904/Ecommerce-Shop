import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async createCategory(data: { name: string; slug: string; description?: string }) {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: string, data: { name: string; slug: string; description?: string }) {
    return this.prisma.category.update({
      where: { id },
      data
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.delete({
      where: { id }
    });
  }
}
