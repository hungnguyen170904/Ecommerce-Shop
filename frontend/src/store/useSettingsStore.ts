import { create } from 'zustand';
import { apiClient } from '../api/axios';

interface SystemSettings {
  siteName: string;
  logoUrl: string;
  bannerUrl1: string;
  bannerUrl2: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
}

interface SettingsState {
  settings: SystemSettings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get('/settings');
      set({ 
        settings: {
          siteName: response.data.siteName || 'E-Commerce',
          logoUrl: response.data.logoUrl || '',
          bannerUrl1: response.data.bannerUrl1 || '',
          bannerUrl2: response.data.bannerUrl2 || '',
          bankName: response.data.bankName || '',
          bankAccount: response.data.bankAccount || '',
          bankAccountName: response.data.bankAccountName || '',
        },
        isLoading: false 
      });
    } catch (error) {
      console.error('Lỗi tải cài đặt:', error);
      set({ isLoading: false });
    }
  }
}));
