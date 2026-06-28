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
    <header className="bg-indigo-600 sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="hidden md:block border-b border-indigo-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-xs text-indigo-100">
            <div className="flex gap-4">
              <Link to="#" className="hover:text-white transition-colors">Kênh Người Bán</Link>
              <span className="text-indigo-400">|</span>
              <Link to="#" className="hover:text-white transition-colors">Trở thành Người bán</Link>
              <span className="text-indigo-400">|</span>
              <Link to="#" className="hover:text-white transition-colors">Tải ứng dụng</Link>
            </div>
            <div className="flex items-center gap-5">
              <Link to="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <Bell className="w-3.5 h-3.5" /> Thông báo
              </Link>
              <Link to="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <HelpCircle className="w-3.5 h-3.5" /> Hỗ trợ
              </Link>
              <button className="flex items-center gap-1 hover:text-white transition-colors">
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
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            {settings?.logoUrl ? (
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1 shadow-sm">
                <img 
                  src={settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Store className="w-6 h-6 text-indigo-600" />
              </div>
            )}
            <span className="font-bold text-2xl tracking-tight text-white hidden sm:block">
              {settings?.siteName || 'E-Commerce'}
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-4xl w-full">
            <form onSubmit={handleSearch} className="relative flex w-full h-11 bg-white rounded-lg shadow-sm border-2 border-transparent focus-within:border-indigo-300 transition-colors overflow-hidden">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
                className="flex-1 px-4 py-2 text-sm focus:outline-none text-slate-900 placeholder:text-slate-500"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 w-16 flex items-center justify-center m-1 rounded hover:bg-indigo-700 transition-colors"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
            <div className="hidden sm:flex gap-3 mt-1.5 text-[11px] text-indigo-200">
              <Link to="/search?q=iphone" className="hover:text-white">iPhone 15</Link>
              <Link to="/search?q=samsung" className="hover:text-white">Samsung S24</Link>
              <Link to="/search?q=macbook" className="hover:text-white">MacBook Pro</Link>
              <Link to="/search?q=sony" className="hover:text-white">Tai nghe Sony</Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 flex-shrink-0 pb-3 sm:pb-0">
            {user && (
              <Link to="/wishlist" className="relative p-2 text-white hover:text-rose-200 transition-colors mt-2" title="Sản phẩm yêu thích">
                <Heart className="w-7 h-7" />
              </Link>
            )}

            <Link to="/compare" className="relative p-2 text-white hover:text-blue-200 transition-colors mt-2" title="So sánh sản phẩm">
              <ArrowRightLeft className="w-7 h-7" />
              {compareItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-indigo-600 shadow-sm">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-white hover:text-indigo-200 transition-colors mt-2" title="Giỏ hàng">
              <ShoppingCart className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-indigo-600 shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group mt-2 flex items-center">
                <Link to={user.role === 'ADMIN' ? '/admin' : '/profile'} className="flex items-center gap-2 cursor-pointer">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-white/30" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center font-bold border border-white/30 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden lg:block text-white">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 mt-2 text-sm font-bold text-indigo-600 bg-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">
                Đăng nhập
              </Link>
            )}
            
            <button className="md:hidden p-2 text-white mt-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
