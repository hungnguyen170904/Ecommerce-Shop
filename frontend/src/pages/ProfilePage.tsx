import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { apiClient } from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2, User as UserIcon, Package, LogOut, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: '',
    address: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    street: '', city: '', state: '', country: 'VN', zipCode: '', isDefault: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadProfile();
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'addresses') {
      loadAddresses();
    }
  }, [activeTab]);

  const loadAddresses = async () => {
    try {
      const res = await apiClient.get('/users/addresses');
      setAddresses(res.data);
    } catch (error) {
      console.error('Lỗi tải sổ địa chỉ', error);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/users/addresses', addressFormData);
      setShowAddressForm(false);
      setAddressFormData({ street: '', city: '', state: '', country: 'VN', zipCode: '', isDefault: false });
      loadAddresses();
      toast.success('Thêm địa chỉ thành công');
    } catch (error) {
      toast.error('Lỗi khi thêm địa chỉ');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Xóa địa chỉ này?')) return;
    try {
      await apiClient.delete(`/users/addresses/${id}`);
      loadAddresses();
      toast.success('Đã xóa địa chỉ');
    } catch (error) {
      toast.error('Lỗi khi xóa địa chỉ');
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      await apiClient.put(`/users/addresses/${id}/default`);
      loadAddresses();
      toast.success('Đã đặt làm mặc định');
    } catch (error) {
      toast.error('Lỗi thiết lập mặc định');
    }
  };

  const loadProfile = async () => {
    try {
      const response = await apiClient.get('/users/profile');
      setProfileData({
        name: response.data.name || '',
        phone: response.data.phone || '',
        address: response.data.address || ''
      });
    } catch (error) {
      console.error('Lỗi khi tải thông tin cá nhân', error);
    }
  };

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/orders/history');
      setOrders(response.data);
    } catch (error) {
      console.error('Lỗi khi tải lịch sử đơn hàng', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await apiClient.put('/users/profile', profileData);
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin', error);
      alert('Có lỗi xảy ra khi cập nhật.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    try {
      await apiClient.put(`/orders/${orderId}/cancel`);
      loadOrders();
    } catch (error) {
      console.error('Lỗi hủy đơn', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200"><Clock className="w-3.5 h-3.5" /> Chờ xử lý</span>;
      case 'PROCESSING':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200"><Package className="w-3.5 h-3.5" /> Đang chuẩn bị</span>;
      case 'DELIVERED':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200"><XCircle className="w-3.5 h-3.5" /> Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">{status}</span>;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tài khoản của tôi</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
              <div className="p-6 text-center border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-3xl mx-auto mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <UserIcon className="w-5 h-5" />
                  Hồ sơ cá nhân
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors mt-1 ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Package className="w-5 h-5" />
                  Lịch sử mua hàng
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors mt-1 ${activeTab === 'addresses' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Sổ địa chỉ
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors mt-1"
                >
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 min-h-[400px]">
              
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Thông tin cá nhân</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 text-slate-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email (Không thể đổi)</label>
                      <input type="email" disabled value={user.email} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
                      <input 
                        type="text" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 text-slate-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Vai trò</label>
                      <input type="text" disabled value={user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Địa chỉ giao hàng mặc định</label>
                      <textarea 
                        value={profileData.address} 
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 text-slate-900 min-h-[100px] resize-none" 
                      />
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                    <Button onClick={handleSaveProfile} isLoading={isSaving} className="h-12 px-8">Lưu thay đổi</Button>
                    <Button variant="outline" className="h-12 border-2">Đổi mật khẩu</Button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Lịch sử đơn hàng</h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8" />
                      </div>
                      <p className="text-slate-500 mb-4">Bạn chưa có đơn hàng nào.</p>
                      <Button onClick={() => navigate('/')}>Mua sắm ngay</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors">
                          <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                            <div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Mã đơn hàng</p>
                              <p className="text-sm font-bold text-slate-900">#{order.id.split('-')[0].toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Ngày đặt</p>
                              <p className="text-sm font-medium text-slate-900">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Tổng tiền</p>
                              <p className="text-sm font-bold text-indigo-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {getStatusBadge(order.status)}
                              {order.status === 'PENDING' && (
                                <button 
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                                >
                                  Hủy đơn
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="p-4 divide-y divide-slate-100">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                                <img 
                                  src={item.variant.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop'} 
                                  alt={item.variant.product.name}
                                  className="w-16 h-16 object-cover rounded-xl bg-slate-100"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-900 line-clamp-1">{item.variant.product.name}</h4>
                                  <p className="text-sm text-slate-500 mt-0.5">Phân loại: {item.variant.color || item.variant.sku} | SL: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-slate-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Sổ địa chỉ</h2>
                    <Button onClick={() => setShowAddressForm(true)}>Thêm địa chỉ mới</Button>
                  </div>

                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200">
                      <h3 className="font-semibold mb-4">Thêm địa chỉ mới</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ chi tiết (Số nhà, đường)</label>
                          <input required type="text" value={addressFormData.street} onChange={e => setAddressFormData({...addressFormData, street: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phường/Xã, Quận/Huyện</label>
                          <input required type="text" value={addressFormData.city} onChange={e => setAddressFormData({...addressFormData, city: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Tỉnh/Thành phố</label>
                          <input required type="text" value={addressFormData.state} onChange={e => setAddressFormData({...addressFormData, state: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)}>Hủy</Button>
                        <Button type="submit">Lưu địa chỉ</Button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`p-5 rounded-2xl border ${addr.isDefault ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-slate-900">{addr.street}</p>
                            <p className="text-slate-600 text-sm mt-1">{addr.city}, {addr.state}, {addr.country}</p>
                            {addr.isDefault && <span className="inline-block mt-2 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">Mặc định</span>}
                          </div>
                          <div className="flex gap-2">
                            {!addr.isDefault && (
                              <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Đặt mặc định</button>
                            )}
                            <button onClick={() => handleDeleteAddress(addr.id)} className="text-sm font-medium text-rose-600 hover:text-rose-700 ml-3">Xóa</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {addresses.length === 0 && !showAddressForm && (
                      <div className="text-center py-10 text-slate-500">Bạn chưa có địa chỉ nào trong sổ.</div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
