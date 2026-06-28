import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  updateUserAvatar: (avatarUrl: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      updateUserAvatar: (avatarUrl) => set((state) => ({
        user: state.user ? { ...state.user, avatarUrl } : null
      })),
    }),
    {
      name: 'auth-storage', // Lưu xuống LocalStorage để f5 không bị mất đăng nhập
    }
  )
);
