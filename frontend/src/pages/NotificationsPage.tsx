import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { apiClient } from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Package, Tag, Info, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchNotifications();
  }, [user, navigate]);

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get('/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Lỗi khi đánh dấu đã đọc', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiClient.put('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('Đã đánh dấu tất cả là đã đọc');
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ORDER': return <Package className="w-6 h-6 text-indigo-500" />;
      case 'PROMO': return <Tag className="w-6 h-6 text-rose-500" />;
      case 'SYSTEM': return <AlertCircle className="w-6 h-6 text-amber-500" />;
      default: return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getBgColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-slate-100';
    switch (type) {
      case 'ORDER': return 'bg-indigo-100';
      case 'PROMO': return 'bg-rose-100';
      case 'SYSTEM': return 'bg-amber-100';
      default: return 'bg-blue-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6" />
              <h1 className="text-xl font-bold tracking-tight">Thông báo của bạn</h1>
            </div>
            {notifications.some(n => !n.isRead) && (
              <button 
                onClick={handleMarkAllRead}
                className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Đánh dấu đã đọc tất cả
              </button>
            )}
          </div>
          
          <div className="divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                <Bell className="w-16 h-16 text-slate-200 mb-4" />
                <p className="text-lg font-medium text-slate-700 mb-1">Chưa có thông báo nào</p>
                <p className="text-sm">Khi có đơn hàng mới hoặc khuyến mãi, thông báo sẽ hiển thị ở đây.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => handleMarkAsRead(notif.id, notif.isRead)}
                  className={`p-5 flex gap-4 transition-colors cursor-pointer hover:bg-slate-50 ${!notif.isRead ? 'bg-indigo-50/30' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notif.type, notif.isRead)}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-base ${!notif.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                        {new Date(notif.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${!notif.isRead ? 'text-slate-700' : 'text-slate-500'}`}>
                      {notif.content}
                    </p>
                    {notif.link && (
                      <Link to={notif.link} className="inline-block mt-2 text-sm font-bold text-indigo-600 hover:text-indigo-800">
                        Xem chi tiết &rarr;
                      </Link>
                    )}
                  </div>
                  {!notif.isRead && (
                    <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
