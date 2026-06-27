import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Store,
  Tag,
  FolderTree,
  Archive,
  ShieldCheck
} from 'lucide-react';
import { useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const settings = useSettingsStore(state => state.settings);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'ADMIN') return null;

  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Đơn hàng', path: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Danh mục', path: '/admin/categories', icon: <FolderTree className="w-5 h-5" /> },
    { name: 'Nhãn hàng', path: '/admin/brands', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'Sản phẩm', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Kho hàng', path: '/admin/inventory', icon: <Archive className="w-5 h-5" /> },
    { name: 'Khách hàng', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Mã giảm giá', path: '/admin/vouchers', icon: <Tag className="w-5 h-5" /> },
    { name: 'Cài đặt', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center px-6 bg-slate-950">
          <Link to="/" className="flex items-center gap-2 text-white overflow-hidden">
            {settings?.logoUrl ? (
              <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
                <img 
                  src={settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl} 
                  alt="Admin Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <Store className="w-8 h-8 text-indigo-500 flex-shrink-0" />
            )}
            <span className="font-bold text-xl tracking-tight truncate">Admin<span className="text-indigo-500">Panel</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quản trị hệ thống</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-600 text-white font-medium shadow-sm' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 bg-slate-950">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Quản trị'}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</p>
              <p className="text-xs text-indigo-600 font-medium leading-none">Quản trị viên</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-200">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
