import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const existingBrand = await this.prisma.brand.findUnique({
      where: { name: createBrandDto.name }
    });
    
    if (existingBrand) {
      throw new ConflictException('Tên nhãn hàng đã tồn tại');
    }

    return this.prisma.brand.create({
      data: {
        name: createBrandDto.name,
        description: createBrandDto.description,
        logoUrl: createBrandDto.logoUrl
      }
    });
  }

  findAll() {
    return this.prisma.brand.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Không tìm thấy nhãn hàng');
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id); // Check exists
    return this.prisma.brand.update({
      where: { id },
      data: {
        name: updateBrandDto.name,
        description: updateBrandDto.description,
        logoUrl: updateBrandDto.logoUrl
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.brand.delete({
      where: { id }
    });
  }
}
