import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Bell, HelpCircle, Globe, ChevronDown, Heart, Store, ArrowRightLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useCompareStore } from '../store/useCompareStore';
import { useEffect, useState, useRef } from 'react';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { itemCount, fetchCart } = useCartStore();
  const settings = useSettingsStore((state) => state.settings);
  const compareItems = useCompareStore((state) => state.items);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-soft border-b border-slate-100">
      {/* Top bar */}
      <div className="hidden md:block bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9 text-xs font-medium text-slate-300">
            <div className="flex gap-4">
              <Link to="/seller" className="hover:text-white transition-colors">Kênh Người Bán</Link>
              <span className="text-slate-700">|</span>
              <Link to="/seller" className="hover:text-white transition-colors">Trở thành Người bán</Link>
              <span className="text-slate-700">|</span>
              <Link to="/help" className="hover:text-white transition-colors">Tải ứng dụng</Link>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/notifications" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Bell className="w-3.5 h-3.5" /> Thông báo
              </Link>
              <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors">
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
          <div ref={searchRef} className="flex-1 max-w-4xl w-full relative z-50">
            <form onSubmit={handleSearch} className={`relative flex w-full h-12 bg-brand-bg rounded-xl border transition-all overflow-hidden shadow-inner ${isSearchFocused ? 'bg-white border-brand-cta ring-4 ring-brand-cta/10' : 'border-transparent'}`}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
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

            {/* Dropdown Gợi ý tìm kiếm */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tìm kiếm phổ biến</h4>
                  <div className="flex flex-wrap gap-2">
                    {['iPhone 15 Pro Max', 'Samsung Galaxy S24', 'MacBook Air M3', 'Tai nghe Sony', 'Loa Marshall', 'Bàn phím cơ'].map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        onClick={() => {
                          setSearchQuery(keyword);
                          setIsSearchFocused(false);
                          navigate(`/search?q=${encodeURIComponent(keyword)}`);
                        }}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-sm font-medium rounded-lg transition-colors border border-slate-100"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
