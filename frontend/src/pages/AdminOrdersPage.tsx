import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Loader2, Package, Search, Eye, X } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/orders/admin');
      setOrders(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách đơn hàng', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!confirm('Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng này?')) return;
    
    setUpdatingId(orderId);
    try {
      await apiClient.put(`/orders/admin/${orderId}/status`, { status: newStatus });
      // Cập nhật local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái', error);
      alert('Không thể cập nhật trạng thái.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-800';
      case 'CANCELLED': return 'bg-rose-100 text-rose-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center bg-slate-50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm mã đơn..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <Package className="w-5 h-5" />
            Tổng cộng: {orders.length} đơn hàng
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Mã Đơn</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Ngày đặt</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Chưa có đơn hàng nào trong hệ thống.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      #{order.id.split('-')[0].toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{order.user.name}</p>
                        <p className="text-xs text-slate-500">{order.user.email}</p>
                        {order.shippingAddress && (
                          <p className="text-xs text-slate-600 mt-1 line-clamp-1" title={order.shippingAddress}>
                            📍 {order.shippingAddress}
                          </p>
                        )}
                        {order.user.phone && (
                          <p className="text-xs text-slate-600">📞 {order.user.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 font-bold text-indigo-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="PROCESSING">Đang chuẩn bị</option>
                        <option value="DELIVERED">Hoàn thành</option>
                        <option value="CANCELLED">Hủy đơn</option>
                      </select>
                      {updatingId === order.id && <Loader2 className="w-4 h-4 animate-spin text-indigo-600 inline ml-2" />}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Chi tiết Đơn hàng #{selectedOrder.id.split('-')[0].toUpperCase()}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Thông tin Khách hàng</h4>
                  <p className="text-sm text-slate-900 font-medium">{selectedOrder.user.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{selectedOrder.user.email}</p>
                  <p className="text-xs text-slate-500 mt-1">SĐT: {selectedOrder.user.phone || 'Không có'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Thông tin Giao hàng</h4>
                  <p className="text-xs text-slate-600 line-clamp-3">{selectedOrder.shippingAddress || 'Không có địa chỉ'}</p>
                  <p className="text-sm font-bold text-slate-700 mt-2 mb-1">Phương thức thanh toán:</p>
                  <p className="text-xs font-semibold text-indigo-600">{selectedOrder.paymentMethod === 'ONLINE' ? 'Chuyển khoản (VietQR)' : 'Thanh toán khi nhận hàng (COD)'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Danh sách Sản phẩm</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <img 
                        src={item.variant?.product?.images?.[0]?.url || 'https://via.placeholder.com/80'} 
                        alt={item.variant?.product?.name}
                        className="w-16 h-16 object-cover rounded-lg bg-slate-50 border border-slate-200"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.variant?.product?.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Phân loại: {item.variant?.color || item.variant?.sku}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs font-medium text-slate-700">SL: {item.quantity}</p>
                          <p className="text-sm font-bold text-indigo-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700">Tổng thanh toán:</span>
              <span className="text-2xl font-extrabold text-indigo-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
