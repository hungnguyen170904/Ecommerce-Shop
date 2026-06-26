import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  // Public endpoint for frontend to get payment settings (e.g. Bank Info)
  @Get()
  getSettings() {
    return this.settingService.getSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put()
  updateSettings(@Body() data: any) {
    return this.settingService.updateSettings(data);
  }
}
