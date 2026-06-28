import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

interface CompareState {
  items: any[];
  addToCompare: (product: any) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCompare: (product) => {
        const items = get().items;
        if (items.find(item => item.id === product.id)) {
          toast.error('Sản phẩm đã có trong danh sách so sánh!');
          return;
        }
        if (items.length >= 3) {
          toast.error('Chỉ có thể so sánh tối đa 3 sản phẩm!');
          return;
        }
        set({ items: [...items, product] });
        toast.success('Đã thêm vào danh sách so sánh!');
      },
      removeFromCompare: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      clearCompare: () => set({ items: [] })
    }),
    {
      name: 'compare-storage',
    }
  )
);
