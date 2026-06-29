import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Bell, HelpCircle, Globe, ChevronDown, Heart, Store, ArrowRightLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useCompareStore } from '../store/useCompareStore';
import { useEffect, useState } from 'react';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { itemCount, fetchCart } = useCartStore();
  const settings = useSettingsStore((state) => state.settings);
  const compareItems = useCompareStore((state) => state.items);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-soft border-b border-slate-100">
      {/* Top bar */}
      <div className="hidden md:block bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9 text-xs font-medium text-slate-300">
            <div className="flex gap-4">
              <Link to="#" className="hover:text-white transition-colors">Kênh Người Bán</Link>
              <span className="text-slate-700">|</span>
              <Link to="#" className="hover:text-white transition-colors">Trở thành Người bán</Link>
              <span className="text-slate-700">|</span>
              <Link to="#" className="hover:text-white transition-colors">Tải ứng dụng</Link>
            </div>
            <div className="flex items-center gap-6">
              <Link to="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Bell className="w-3.5 h-3.5" /> Thông báo
              </Link>
              <Link to="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <HelpCircle className="w-3.5 h-3.5" /> Hỗ trợ
              </Link>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Globe className="w-3.5 h-3.5" /> Tiếng Việt <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4 lg:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            {settings?.logoUrl ? (
              <div className="w-12 h-12 bg-brand-bg rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                <img 
                  src={settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-brand-cta rounded-[14px] flex items-center justify-center shadow-soft">
                <Store className="w-7 h-7 text-white" />
              </div>
            )}
            <span className="font-extrabold text-2xl tracking-tight text-brand-dark hidden sm:block">
              {settings?.siteName || 'E-Commerce'}
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-4xl w-full">
            <form onSubmit={handleSearch} className="relative flex w-full h-12 bg-brand-bg rounded-xl border border-transparent focus-within:bg-white focus-within:border-brand-cta transition-all overflow-hidden shadow-inner">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
                className="flex-1 px-5 py-2 text-sm bg-transparent focus:outline-none text-brand-dark placeholder:text-slate-400 font-medium"
              />
              <button 
                type="submit" 
                className="bg-brand-cta w-16 flex items-center justify-center m-1 rounded-lg hover:bg-brand-cta-hover transition-colors shadow-soft"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
            <div className="hidden sm:flex gap-4 mt-2 text-xs font-medium text-brand-muted">
              <Link to="/search?q=iphone" className="hover:text-brand-cta">iPhone 15</Link>
              <Link to="/search?q=samsung" className="hover:text-brand-cta">Samsung S24</Link>
              <Link to="/search?q=macbook" className="hover:text-brand-cta">MacBook Pro</Link>
              <Link to="/search?q=sony" className="hover:text-brand-cta">Tai nghe Sony</Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 flex-shrink-0 pb-3 sm:pb-0">
            {user && (
              <Link to="/wishlist" className="relative p-2 text-brand-muted hover:text-brand-cta transition-colors mt-2" title="Sản phẩm yêu thích">
                <Heart className="w-7 h-7" />
              </Link>
            )}

            <Link to="/compare" className="relative p-2 text-brand-muted hover:text-brand-cta transition-colors mt-2" title="So sánh sản phẩm">
              <ArrowRightLeft className="w-7 h-7" />
              {compareItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-cta text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-soft">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-brand-muted hover:text-brand-cta transition-colors mt-2" title="Giỏ hàng">
              <ShoppingCart className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-soft">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group mt-2 flex items-center">
                <Link to={user.role === 'ADMIN' ? '/admin' : '/profile'} className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-colors">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-bg text-brand-cta flex items-center justify-center font-bold border border-slate-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden lg:block text-brand-dark">
                    <p className="text-sm font-bold leading-none">{user.name}</p>
                    <p className="text-xs text-brand-muted mt-1">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 mt-2 text-sm font-bold text-white bg-brand-cta px-6 py-2.5 rounded-xl shadow-soft hover:bg-brand-cta-hover transition-colors">
                Đăng nhập
              </Link>
            )}
            
            <button className="md:hidden p-2 text-brand-dark mt-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
