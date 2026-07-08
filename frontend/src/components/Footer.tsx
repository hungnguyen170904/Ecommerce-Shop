import { Link } from 'react-router-dom';
import { useSettingsStore } from '../store/useSettingsStore';
import { Store, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const settings = useSettingsStore(state => state.settings);

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 bg-white rounded-2xl border border-blue-100 shadow-soft">
          {[
            { icon: '🚚', title: 'Giao hàng miễn phí', sub: 'Đơn từ 500.000₫' },
            { icon: '🔄', title: 'Đổi trả 7 ngày', sub: 'Miễn phí tận nhà' },
            { icon: '✅', title: 'Hàng chính hãng', sub: 'Cam kết 100%' },
            { icon: '💬', title: 'Hỗ trợ 24/7', sub: 'Tư vấn nhiệt tình' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nội dung chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Cột 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              {settings?.logoUrl ? (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center overflow-hidden p-1 shadow-soft">
                  <img src={settings.logoUrl.startsWith('/') ? `http://localhost:3000${settings.logoUrl}` : settings.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-soft">
                  <Store className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="font-extrabold text-xl tracking-tight text-blue-600">
                {settings?.siteName || 'E-Commerce'}
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              Nền tảng mua sắm trực tuyến hàng đầu, mang đến hàng ngàn sản phẩm chính hãng với giá tốt nhất.
            </p>
            <div className="space-y-2.5 text-sm text-slate-500">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>123 Đường Số 1, Quận 1, TP. HCM</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400 shrink-0" /><span>1900 1234 56</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400 shrink-0" /><span>support@ecommerce.vn</span></div>
            </div>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">Chăm sóc khách hàng</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {[
                { to: '/help', label: 'Trung Tâm Trợ Giúp' },
                { to: '/shopping-guide', label: 'Hướng Dẫn Mua Hàng' },
                { to: '/payment-guide', label: 'Hướng Dẫn Thanh Toán' },
                { to: '/shipping', label: 'Chính Sách Vận Chuyển' },
                { to: '/returns', label: 'Trả Hàng & Hoàn Tiền' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-blue-600 transition-colors hover:translate-x-1 inline-block transition-transform duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">Về chúng tôi</h3>
            <ul className="space-y-3 text-sm text-slate-500 mb-7">
              {[
                { to: '/about', label: `Giới Thiệu` },
                { to: '/careers', label: 'Tuyển Dụng' },
                { to: '/terms', label: 'Điều Khoản Dịch Vụ' },
                { to: '/privacy', label: 'Chính Sách Bảo Mật' },
                { to: '/seller', label: 'Kênh Người Bán' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-blue-600 transition-colors hover:translate-x-1 inline-block transition-transform duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Thanh toán</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'VISA', color: 'text-blue-700' },
                { label: 'JCB', color: 'text-red-600' },
                { label: 'MOMO', color: 'text-pink-600' },
                { label: 'VNPay', color: 'text-green-600' },
              ].map(p => (
                <div key={p.label} className={`px-2.5 py-1 bg-white border border-blue-100 rounded-lg text-xs font-bold shadow-soft ${p.color}`}>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">Theo dõi chúng tôi</h3>
            <div className="flex gap-3 mb-8">
              {[
                { label: 'f', color: 'bg-blue-600', title: 'Facebook' },
                { label: 'in', color: 'bg-blue-700', title: 'LinkedIn' },
                { label: 'ig', color: 'bg-gradient-to-br from-purple-500 to-pink-500', title: 'Instagram' },
                { label: 'yt', color: 'bg-red-600', title: 'YouTube' },
              ].map(s => (
                <a key={s.title} href="#" title={s.title} className={`w-9 h-9 ${s.color} text-white rounded-xl flex items-center justify-center text-xs font-bold shadow-soft hover:scale-110 hover:shadow-hover transition-all duration-200`}>
                  {s.label}
                </a>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tải ứng dụng</h3>
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-white border border-blue-100 rounded-xl flex items-center justify-center text-slate-400 text-[10px] text-center p-1 shadow-soft">QR Code</div>
              <div className="flex flex-col gap-2 justify-center">
                <div className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg text-center font-semibold tracking-wide hover:bg-slate-700 cursor-pointer transition-colors">App Store</div>
                <div className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg text-center font-semibold tracking-wide hover:bg-slate-700 cursor-pointer transition-colors">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-400">
          <p>© 2026 <span className="text-blue-600 font-semibold">{settings?.siteName || 'E-Commerce'}</span>. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            {['Hà Nội', 'Đà Nẵng', 'TP. HCM', 'Cần Thơ'].map((city, i, arr) => (
              <span key={city} className={`${i < arr.length - 1 ? 'pr-4 border-r border-blue-100' : ''} hover:text-blue-600 cursor-pointer transition-colors`}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
