import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Ticket, Plus, Tag, Search, Calendar, Percent, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';

export default function AdminVouchersPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discountType: 'PERCENTAGE',
    discountValue: '',
    minOrderValue: '0',
    maxDiscount: '',
    usageLimit: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/coupons/admin');
      setCoupons(response.data);
    } catch (error) {
      console.error('Lỗi khi tải mã giảm giá', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...newCoupon,
        startDate: new Date(newCoupon.startDate).toISOString(),
        endDate: new Date(newCoupon.endDate).toISOString(),
      };
      await apiClient.post('/coupons/admin', data);
      setShowAddModal(false);
      fetchCoupons();
    } catch (error) {
      console.error('Lỗi tạo mã', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Ticket className="w-6 h-6 text-indigo-600" />
          Quản lý Mã Giảm Giá
        </h2>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Tạo Mã Mới
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm mã giảm giá..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80 uppercase"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Mã Khuyến Mãi</th>
                <th className="px-6 py-4">Giảm Giá</th>
                <th className="px-6 py-4">Thời Gian</th>
                <th className="px-6 py-4">Lượt Dùng</th>
                <th className="px-6 py-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Chưa có mã giảm giá nào.
                  </td>
                </tr>
              ) : coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 uppercase tracking-wider">{coupon.code}</p>
                        <p className="text-xs text-slate-500 max-w-[200px] truncate" title={coupon.description}>{coupon.description || 'Không có mô tả'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-indigo-600">
                      {coupon.discountType === 'PERCENTAGE' 
                        ? `${coupon.discountValue}%` 
                        : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(coupon.discountValue)}
                    </p>
                    <p className="text-xs text-slate-500">Đơn tối thiểu: {new Intl.NumberFormat('vi-VN').format(coupon.minOrderValue)}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs space-y-1">
                    <p className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> BĐ: {new Date(coupon.startDate).toLocaleDateString('vi-VN')}</p>
                    <p className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> KT: {new Date(coupon.endDate).toLocaleDateString('vi-VN')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{coupon.usageCount} / {coupon.usageLimit || '∞'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {coupon.isActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Hoạt động</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Vô hiệu hóa</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Tạo Mã Giảm Giá Mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleCreateCoupon}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mã Code (Tự nhập)</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 uppercase"
                    value={newCoupon.code}
                    onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                    placeholder="VD: SUMMERSALE20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={newCoupon.description}
                    onChange={e => setNewCoupon({...newCoupon, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Loại giảm giá</label>
                    <div className="flex bg-slate-100 rounded-xl p-1">
                      <button 
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${newCoupon.discountType === 'PERCENTAGE' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                        onClick={() => setNewCoupon({...newCoupon, discountType: 'PERCENTAGE'})}
                      >
                        <Percent className="w-4 h-4" /> Phần trăm
                      </button>
                      <button 
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${newCoupon.discountType === 'FIXED_AMOUNT' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                        onClick={() => setNewCoupon({...newCoupon, discountType: 'FIXED_AMOUNT'})}
                      >
                        <DollarSign className="w-4 h-4" /> Tiền mặt
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mức giảm</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      value={newCoupon.discountValue}
                      onChange={e => setNewCoupon({...newCoupon, discountValue: e.target.value})}
                      placeholder={newCoupon.discountType === 'PERCENTAGE' ? '% (VD: 20)' : 'VNĐ (VD: 50000)'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Đơn tối thiểu (VNĐ)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      value={newCoupon.minOrderValue}
                      onChange={e => setNewCoupon({...newCoupon, minOrderValue: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Giảm tối đa (Tùy chọn)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      value={newCoupon.maxDiscount}
                      onChange={e => setNewCoupon({...newCoupon, maxDiscount: e.target.value})}
                      placeholder="Trống = không giới hạn"
                      disabled={newCoupon.discountType === 'FIXED_AMOUNT'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày bắt đầu</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      value={newCoupon.startDate}
                      onChange={e => setNewCoupon({...newCoupon, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày kết thúc</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      value={newCoupon.endDate}
                      onChange={e => setNewCoupon({...newCoupon, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giới hạn số lần dùng (Tùy chọn)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={newCoupon.usageLimit}
                    onChange={e => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                    placeholder="Trống = không giới hạn"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Hủy</Button>
                <Button type="submit">Lưu Mã Giảm Giá</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
