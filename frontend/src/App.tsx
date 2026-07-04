import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminVouchersPage from './pages/AdminVouchersPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminBrandsPage from './pages/AdminBrandsPage';
import AdminInventoryPage from './pages/AdminInventoryPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';
import ContentPage from './pages/ContentPage';
import SellerLandingPage from './pages/SellerLandingPage';
import NotificationsPage from './pages/NotificationsPage';
import { useAuthStore } from './store/useAuthStore';
import { useSettingsStore } from './store/useSettingsStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const fetchSettings = useSettingsStore(state => state.fetchSettings);
  const settings = useSettingsStore(state => state.settings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings?.logoUrl) {
      // Cập nhật Favicon
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl;
      
      // Đổi tiêu đề thay vì Vite
      document.title = `${settings.siteName} | Storefront`;
    } else {
      document.title = settings?.siteName || "Cửa hàng của tôi";
    }
  }, [settings]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', background: '#334155', color: '#fff' } }} />
      <Routes>
        {/* Các trang Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/compare" element={<ComparePage />} />
        
        {/* Các trang tĩnh (Static Pages) */}
        <Route path="/about" element={<ContentPage slug="about" />} />
        <Route path="/terms" element={<ContentPage slug="terms" />} />
        <Route path="/privacy" element={<ContentPage slug="privacy" />} />
        <Route path="/shipping" element={<ContentPage slug="shipping" />} />
        <Route path="/returns" element={<ContentPage slug="returns" />} />
        <Route path="/payment-guide" element={<ContentPage slug="payment-guide" />} />
        <Route path="/shopping-guide" element={<ContentPage slug="shopping-guide" />} />
        <Route path="/selling-guide" element={<ContentPage slug="selling-guide" />} />
        <Route path="/help" element={<ContentPage slug="help" />} />
        <Route path="/careers" element={<ContentPage slug="careers" />} />
        
        {/* Kênh Người Bán */}
        <Route path="/seller" element={<SellerLandingPage />} />
        
        {/* Các trang yêu cầu Đăng nhập */}
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Khu vực Admin */}
        <Route 
          path="/admin" 
          element={<AdminDashboardPage />} 
        />
        <Route 
          path="/admin/orders" 
          element={<AdminOrdersPage />} 
        />
        <Route 
          path="/admin/products" 
          element={<AdminProductsPage />} 
        />
        <Route 
          path="/admin/users" 
          element={<AdminUsersPage />} 
        />
        <Route 
          path="/admin/settings" 
          element={<AdminSettingsPage />} 
        />
        <Route 
          path="/admin/vouchers" 
          element={<AdminVouchersPage />} 
        />
        <Route 
          path="/admin/categories" 
          element={<AdminCategoriesPage />} 
        />
        <Route 
          path="/admin/brands" 
          element={<AdminBrandsPage />} 
        />
        <Route 
          path="/admin/inventory" 
          element={<AdminInventoryPage />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
