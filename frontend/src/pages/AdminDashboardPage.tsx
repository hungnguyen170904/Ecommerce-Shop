import { AdminLayout } from '../components/AdminLayout';
import { Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/orders/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Lỗi khi tải thống kê', error);
    }
  };

  const statCards = [
    {
      title: 'Tổng Doanh Thu',
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue),
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50'
    },
    {
      title: 'Đơn Hàng',
      value: stats.totalOrders.toString(),
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Khách Hàng',
      value: stats.totalUsers.toString(),
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50'
    }
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <TrendingUp className="w-16 h-16 text-slate-200 mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Biểu đồ thống kê</h3>
        <p className="text-slate-500">Khu vực này sẽ hiển thị biểu đồ doanh thu theo thời gian.</p>
        <p className="text-sm text-slate-400 mt-2">(Tính năng đang được phát triển)</p>
      </div>
    </AdminLayout>
  );
}
