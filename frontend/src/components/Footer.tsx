import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Cột 1 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Chăm sóc khách hàng</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-indigo-600">Trung Tâm Trợ Giúp</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Hướng Dẫn Mua Hàng</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Hướng Dẫn Bán Hàng</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Thanh Toán</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Vận Chuyển</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Trả Hàng & Hoàn Tiền</Link></li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Về E-Commerce</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-indigo-600">Giới Thiệu Về E-Commerce Việt Nam</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Tuyển Dụng</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Điều Khoản E-Commerce</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Chính Sách Bảo Mật</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Chính Hãng</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Kênh Người Bán</Link></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Thanh toán</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-blue-800">VISA</div>
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-red-600">JCB</div>
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-pink-600">MOMO</div>
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-green-600">VNPay</div>
            </div>
            
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 mt-8">Đơn vị vận chuyển</h3>
            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-orange-600">ShopeeXpress</div>
              <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-green-700">GHTK</div>
              <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-600">GHN</div>
            </div>
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Theo dõi chúng tôi trên</h3>
            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li><Link to="#" className="flex items-center gap-2 hover:text-indigo-600">Facebook</Link></li>
              <li><Link to="#" className="flex items-center gap-2 hover:text-indigo-600">Instagram</Link></li>
              <li><Link to="#" className="flex items-center gap-2 hover:text-indigo-600">LinkedIn</Link></li>
            </ul>

            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tải ứng dụng</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs text-center p-2 border border-slate-200">
                QR Code
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <div className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded text-center font-semibold tracking-wider">App Store</div>
                <div className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded text-center font-semibold tracking-wider">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 E-Commerce. Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <span>Quốc gia & Khu vực:</span>
            <Link to="#" className="hover:text-indigo-600">Việt Nam</Link>
            <span className="border-l border-slate-300"></span>
            <Link to="#" className="hover:text-indigo-600">Singapore</Link>
            <span className="border-l border-slate-300"></span>
            <Link to="#" className="hover:text-indigo-600">Thái Lan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
