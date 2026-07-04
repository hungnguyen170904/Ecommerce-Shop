import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Store, TrendingUp, ShieldCheck, Zap, BarChart3, Users } from 'lucide-react';

export default function SellerLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop" 
              alt="Seller Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-sm font-medium text-emerald-50">Hơn 10,000+ Nhà bán hàng đang tin dùng</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Bán hàng online dễ dàng hơn <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                với nền tảng của chúng tôi
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Tiếp cận hàng triệu khách hàng tiềm năng, quản lý đơn hàng thông minh và tăng trưởng doanh thu đột phá. Bắt đầu hoàn toàn miễn phí!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-14 px-8 text-lg font-bold shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] bg-indigo-600 hover:bg-indigo-500">
                Đăng ký Bán hàng ngay
              </Button>
              <Button variant="outline" className="h-14 px-8 text-lg font-bold border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại sao nên chọn chúng tôi?</h2>
              <p className="text-lg text-slate-600">Chúng tôi cung cấp hệ sinh thái toàn diện giúp bạn tập trung vào việc bán hàng, mọi thứ khác đã có hệ thống lo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tăng trưởng doanh thu</h3>
                <p className="text-slate-600 leading-relaxed">Tiếp cận tệp khách hàng khổng lồ, tham gia các chiến dịch Mega Sale để x3, x5 doanh số trong một ngày.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Thanh toán an toàn</h3>
                <p className="text-slate-600 leading-relaxed">Hệ thống đối soát minh bạch, tiền về ví tự động và nhanh chóng sau khi đơn hàng giao thành công.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Vận hành tự động</h3>
                <p className="text-slate-600 leading-relaxed">Quản lý tồn kho, in mã vận đơn, và gọi shipper chỉ với 1 click. Giảm thiểu tối đa nhân sự vận hành.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">4 Bước Đơn Giản Để Bắt Đầu</h2>
              <p className="text-lg text-slate-400">Không yêu cầu thủ tục rườm rà, bạn có thể bắt đầu bán món hàng đầu tiên chỉ sau 5 phút.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-slate-700 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-xl">
                  <span className="text-2xl font-black text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Đăng ký</h3>
                <p className="text-slate-400 text-sm">Điền thông tin cơ bản để tạo Cửa hàng miễn phí.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-xl">
                  <span className="text-2xl font-black text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Đăng sản phẩm</h3>
                <p className="text-slate-400 text-sm">Chụp ảnh đẹp, viết mô tả và định giá cho sản phẩm của bạn.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-xl">
                  <span className="text-2xl font-black text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Nhận đơn hàng</h3>
                <p className="text-slate-400 text-sm">Đóng gói sản phẩm theo quy chuẩn khi có đơn.</p>
              </div>
              
              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors shadow-xl">
                  <span className="text-2xl font-black text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Nhận tiền</h3>
                <p className="text-slate-400 text-sm">Tiền được chuyển tự động vào tài khoản của bạn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-indigo-600 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <Store className="w-16 h-16 text-indigo-200 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
              Sẵn sàng xây dựng <br/>đế chế kinh doanh của riêng bạn?
            </h2>
            <Link to="/register">
              <Button className="h-16 px-10 text-xl font-bold bg-white text-indigo-700 hover:bg-slate-100 shadow-2xl hover:-translate-y-1 transition-transform">
                Tạo Gian Hàng Miễn Phí
              </Button>
            </Link>
            <p className="text-indigo-200 mt-6 font-medium">Hỗ trợ 1-1 miễn phí trong 30 ngày đầu tiên.</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
