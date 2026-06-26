import React from 'react';
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
import WishlistPage from './pages/WishlistPage';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
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
        
        {/* Các trang yêu cầu Đăng nhập */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
