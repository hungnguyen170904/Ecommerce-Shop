import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Loader2, Users, Search, Ban, Gift, X } from 'lucide-react';
import { Button } from '../components/Button';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [adjustingUser, setAdjustingUser] = useState<any>(null);
  const [pointsChange, setPointsChange] = useState('');
  const [reason, setReason] = useState('');
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanUser = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa/cấm tài khoản của ${name}?`)) return;
    try {
      await apiClient.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng', error);
      alert('Không thể xóa người dùng này (có thể do họ đã có đơn hàng/đánh giá).');
    }
  };

  const submitAdjustPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointsChange || !reason) return;
    setIsAdjusting(true);
    try {
      await apiClient.put(`/users/admin/${adjustingUser.id}/points`, {
        pointsChange: Number(pointsChange),
        reason
      });
      fetchUsers();
      setAdjustingUser(null);
      setPointsChange('');
      setReason('');
    } catch (error) {
      console.error('Lỗi khi điều chỉnh điểm', error);
      alert('Có lỗi xảy ra khi điều chỉnh điểm.');
    } finally {
      setIsAdjusting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Quản lý Khách hàng
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm khách hàng..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Liên hệ</th>
                <th className="px-6 py-4">Hạng & Điểm</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900">{user.name || 'Người dùng ẩn danh'}</p>
                        <p className="text-xs text-slate-500">Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-900">{user.email}</p>
                    <p className="text-slate-500 text-xs">{user.phone || 'Chưa cập nhật SĐT'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${
                      user.tier === 'DIAMOND' ? 'bg-indigo-100 text-indigo-700' :
                      user.tier === 'GOLD' ? 'bg-amber-100 text-amber-700' :
                      user.tier === 'SILVER' ? 'bg-slate-200 text-slate-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {user.tier}
                    </span>
                    <p className="text-slate-500 text-xs mt-1">{user.points} điểm</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'ADMIN' ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Admin</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Thành viên</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => setAdjustingUser(user)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                      title="Chỉnh sửa điểm"
                    >
                      <Gift className="w-4 h-4" />
                    </button>
                    {user.role !== 'ADMIN' && (
                      <button 
                        onClick={() => handleBanUser(user.id, user.name)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                        title="Xóa/Cấm"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Điều chỉnh điểm */}
      {adjustingUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Điều chỉnh điểm</h3>
              <button onClick={() => setAdjustingUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={submitAdjustPoints} className="p-6">
              <p className="text-sm text-slate-600 mb-6">
                Khách hàng: <strong className="text-slate-900">{adjustingUser.name}</strong><br/>
                Điểm hiện tại: <strong className="text-indigo-600">{adjustingUser.points}</strong>
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số điểm điều chỉnh (Có thể nhập số âm để trừ)</label>
                  <input 
                    type="number" 
                    required
                    value={pointsChange} 
                    onChange={(e) => setPointsChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: 500 hoặc -100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lý do điều chỉnh</label>
                  <input 
                    type="text" 
                    required
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    placeholder="VD: Tặng điểm sự kiện sinh nhật"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setAdjustingUser(null)}>Hủy</Button>
                <Button type="submit" isLoading={isAdjusting} className="flex-1">Xác nhận</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
