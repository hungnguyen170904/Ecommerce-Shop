import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.systemSetting.findMany();
    // Convert array of {key, value} to object
    const result: any = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    return result;
  }

  async updateSettings(data: any) {
    const keys = Object.keys(data);
    for (const key of keys) {
      await this.prisma.systemSetting.upsert({
        where: { key },
        update: { value: data[key].toString() },
        create: { key, value: data[key].toString() }
      });
    }
    return { success: true };
  }
}
