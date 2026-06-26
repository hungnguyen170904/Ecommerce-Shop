import { create } from 'zustand';
import { apiClient } from '../api/axios';

interface CartState {
  itemCount: number;
  fetchCart: () => Promise<void>;
  updateCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  itemCount: 0,
  updateCount: (count) => set({ itemCount: count }),
  fetchCart: async () => {
    try {
      // Chỉ gọi API nếu đã đăng nhập (có token)
      const token = localStorage.getItem('auth-storage');
      if (!token || !token.includes('"token":null')) {
         const response = await apiClient.get('/cart');
         if (response.data && response.data.items) {
           const count = response.data.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
           set({ itemCount: count });
         }
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  },
}));
