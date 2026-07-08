import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Bell, HelpCircle, Heart, Store, ArrowRightLeft, Sparkles } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchCart();
  }, [user, fetchCart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(37,99,235,0.10)]' : ''}`}>
      {/* Announcement Bar — gradient xanh mỏng */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Miễn phí vận chuyển cho đơn từ <strong>500K</strong> · Giao hàng trong 24h</span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-white/90">
              <Link to="/notifications" className="flex items-center gap-1 hover:text-white transition-colors">
                <Bell className="w-3 h-3" /> Thông báo
              </Link>
              <Link to="/help" className="flex items-center gap-1 hover:text-white transition-colors">
                <HelpCircle className="w-3 h-3" /> Hỗ trợ
              </Link>
              <Link to="/seller" className="flex items-center gap-1 hover:text-white transition-colors font-bold">
                Kênh Người Bán
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 gap-4 lg:gap-10 py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              {settings?.logoUrl ? (
                <div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-white rounded-[14px] flex items-center justify-center overflow-hidden p-1 shadow-soft border border-blue-100 group-hover:shadow-blue transition-all duration-300">
                  <img
                    src={settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-500 rounded-[14px] flex items-center justify-center shadow-blue group-hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all duration-300">
                  <Store className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="font-extrabold text-xl tracking-tight text-brand-dark hidden sm:block group-hover:text-brand-cta transition-colors duration-300">
                {settings?.siteName || 'E-Commerce'}
              </span>
            </Link>

            {/* Search Bar — pill shape */}
            <div ref={searchRef} className="flex-1 max-w-2xl w-full relative z-50">
              <form
                onSubmit={handleSearch}
                className={`relative flex w-full h-11 rounded-full border-2 transition-all duration-300 overflow-hidden ${
                  isSearchFocused
                    ? 'bg-white border-blue-500 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]'
                    : 'bg-blue-50/60 border-blue-100 hover:border-blue-200 hover:bg-white'
                }`}
              >
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
                  className="bg-gradient-to-r from-blue-600 to-blue-500 w-14 flex items-center justify-center m-1 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-blue"
                >
                  <Search className="h-4 w-4 text-white" />
                </button>
              </form>

              {/* Dropdown gợi ý */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-100 rounded-2xl shadow-[0_10px_40px_rgba(37,99,235,0.12)] overflow-hidden">
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
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-slate-600 text-sm font-medium rounded-full transition-all duration-200 border border-blue-100"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {user && (
                <Link to="/wishlist" className="relative p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 group" title="Yêu thích">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              )}

              <Link to="/compare" className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group" title="So sánh">
                <ArrowRightLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {compareItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {compareItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group" title="Giỏ hàng">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-[pulse_2s_ease-in-out_infinite]">
                    {itemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link
                  to={user.role === 'ADMIN' ? '/admin' : '/profile'}
                  className="flex items-center gap-2.5 ml-1 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-sm shadow-soft">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden lg:block">
                    <p className="text-sm font-bold text-brand-dark leading-none">{user.name}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}</p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="ml-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 rounded-full shadow-blue hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
