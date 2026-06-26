import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { apiClient } from '../api/axios';
import { useCartStore } from '../store/useCartStore';
import { Loader2, Trash2, ShoppingBag, CreditCard, CheckCircle, ShoppingCart, ShieldCheck, Minus, Plus, X, MapPin, Phone, Truck } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: '',
    phone: '',
    paymentMethod: 'COD'
  });
  const [bankSettings, setBankSettings] = useState<any>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  
  const [orderSuccess, setOrderSuccess] = useState(false);
  const fetchCart = useCartStore(state => state.fetchCart);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await apiClient.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi tải giỏ hàng', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponError('');
    try {
      const items = cart?.items || [];
      const currentTotal = items.reduce((sum: number, item: any) => {
        const price = item.variant.price ?? item.variant.product.basePrice;
        return sum + (price * item.quantity);
      }, 0);

      const response = await apiClient.post('/coupons/validate', {
        code: couponCode,
        totalAmount: currentTotal
      });
      setDiscountAmount(response.data.discountAmount);
    } catch (error: any) {
      setCouponError(error.response?.data?.message || 'Mã giảm giá không hợp lệ.');
      setDiscountAmount(0);
    }
  };

  const handleOpenCheckout = async () => {
    try {
      const [profileRes, settingsRes] = await Promise.all([
        apiClient.get('/users/profile'),
        apiClient.get('/settings')
      ]);
      setCheckoutData({
        ...checkoutData,
        shippingAddress: profileRes.data.address || '',
        phone: profileRes.data.phone || ''
      });
      setBankSettings(settingsRes.data);
    } catch (error) {
      console.error('Lỗi lấy profile hoặc settings', error);
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = async () => {
    if (!checkoutData.shippingAddress || !checkoutData.phone) {
      toast.error('Vui lòng nhập đầy đủ Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    setIsCheckingOut(true);
    try {
      await apiClient.post('/orders/checkout', {
        shippingAddress: checkoutData.shippingAddress,
        paymentMethod: checkoutData.paymentMethod,
        couponCode: couponCode
      });
      await fetchCart(); // Reset số lượng Navbar về 0
      setShowCheckoutModal(false);
      setOrderSuccess(true);
      toast.success('Đặt hàng thành công!');
    } catch (error) {
      console.error('Lỗi khi thanh toán', error);
      toast.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await apiClient.put(`/cart/${itemId}`, { quantity: newQuantity });
      await loadCart();
      await fetchCart(); // update navbar count
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) return;
    try {
      await apiClient.delete(`/cart/${itemId}`);
      await loadCart();
      await fetchCart();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center max-w-lg w-full">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Đặt hàng thành công!</h2>
            <p className="text-slate-600 mb-8">Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.</p>
            <Button onClick={() => navigate('/')} className="h-12 px-8">
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalAmount = items.reduce((sum: number, item: any) => {
    const price = item.variant.price ?? item.variant.product.basePrice;
    return sum + (price * item.quantity);
  }, 0);
  
  const finalAmount = totalAmount - discountAmount > 0 ? totalAmount - discountAmount : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Giỏ hàng của bạn</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-12 text-center">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Giỏ hàng trống</h2>
            <p className="text-slate-500 mb-8">Chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
            <Link to="/">
              <Button className="h-12 px-8">Khám phá sản phẩm</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => {
                const product = item.variant.product;
                const price = item.variant.price ?? product.basePrice;
                const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop';
                
                return (
                  <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-4 sm:gap-6 items-center">
                    <img src={imageUrl} alt={product.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl bg-slate-50" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg sm:text-xl line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">Phân loại: {item.variant.color || item.variant.sku}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-indigo-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden h-8">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <div className="w-10 h-full flex items-center justify-center font-medium text-slate-900 border-x border-slate-200 text-sm">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors bg-white rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Tạm tính</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Tổng tiền hàng</span>
                    <span className="font-medium text-slate-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-600">
                      <span>Giảm giá</span>
                      <span className="font-medium">- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-emerald-600">Miễn phí</span>
                  </div>
                </div>

                {/* Áp mã giảm giá */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nhập mã giảm giá..." 
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={handleApplyCoupon} className="px-4 text-sm whitespace-nowrap">Áp dụng</Button>
                  </div>
                  {couponError && <p className="text-xs text-rose-500 mt-2">{couponError}</p>}
                  {discountAmount > 0 && <p className="text-xs text-emerald-600 mt-2">Đã áp dụng mã giảm giá thành công!</p>}
                </div>

                <div className="border-t border-slate-100 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Tổng thanh toán</span>
                    <span className="text-2xl font-extrabold text-indigo-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalAmount)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 text-right mt-1">(Đã bao gồm VAT)</p>
                </div>

                <Button 
                  fullWidth 
                  className="h-14 text-base shadow-lg shadow-indigo-200 gap-2"
                  onClick={handleOpenCheckout}
                >
                  <CreditCard className="w-5 h-5" />
                  Tiến hành Đặt hàng
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="w-4 h-4" />
                  Thanh toán an toàn 100%
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Xác nhận thông tin giao hàng</h3>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Phone className="w-4 h-4" /> Số điện thoại người nhận
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: 0987654321"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  value={checkoutData.phone}
                  onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4" /> Địa chỉ giao hàng chi tiết
                </label>
                <textarea 
                  required
                  placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
                  value={checkoutData.shippingAddress}
                  onChange={(e) => setCheckoutData({...checkoutData, shippingAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phương thức thanh toán</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    className={`px-4 py-3 border rounded-xl flex flex-col items-center gap-2 transition-colors ${checkoutData.paymentMethod === 'COD' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-slate-200 hover:border-indigo-300'}`}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: 'COD'})}
                  >
                    <Truck className="w-6 h-6" />
                    <span className="text-sm">Thanh toán khi nhận hàng</span>
                  </button>
                  <button 
                    className={`px-4 py-3 border rounded-xl flex flex-col items-center gap-2 transition-colors ${checkoutData.paymentMethod === 'ONLINE' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-slate-200 hover:border-indigo-300'}`}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: 'ONLINE'})}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm">Chuyển khoản Ngân hàng</span>
                  </button>
                </div>
                
                {checkoutData.paymentMethod === 'ONLINE' && bankSettings?.bankAccount && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-col items-center text-center animate-fade-in">
                    <p className="text-sm text-indigo-800 font-medium mb-3">Quét mã QR để thanh toán nhanh</p>
                    <img 
                      src={`https://img.vietqr.io/image/${bankSettings.bankName}-${bankSettings.bankAccount}-compact2.jpg?amount=${finalAmount}&accountName=${bankSettings.bankAccountName}`} 
                      alt="QR Code" 
                      className="w-48 h-48 rounded-lg shadow-sm mb-3 bg-white"
                    />
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>Ngân hàng: <strong>{bankSettings.bankName}</strong></p>
                      <p>Số tài khoản: <strong>{bankSettings.bankAccount}</strong></p>
                      <p>Chủ tài khoản: <strong>{bankSettings.bankAccountName}</strong></p>
                      <p>Nội dung: <strong>THANH TOAN DON HANG</strong></p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCheckoutModal(false)}>Hủy bỏ</Button>
              <Button onClick={handleConfirmCheckout} isLoading={isCheckingOut}>Xác nhận & Đặt hàng</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
