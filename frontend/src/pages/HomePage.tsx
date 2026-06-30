import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { apiClient } from '../api/axios';
import { Loader2, ChevronRight, Zap } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, setRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/categories'),
          apiClient.get('/settings')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setSettings(setRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroProduct1 = products.length > 0 ? products[0] : null;
  const heroProduct2 = products.length > 1 ? products[1] : null;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Bento Grid Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div className="md:col-span-2 rounded-[32px] overflow-hidden aspect-[21/9] md:aspect-auto md:h-[420px] relative group shadow-soft hover:shadow-hover transition-all duration-500">
            <img src={settings?.bannerUrl1 || heroProduct1?.images?.[0]?.url || "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1200"} alt="Promo 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white max-w-md">
              <span className="px-4 py-1.5 rounded-full bg-brand-cta/20 backdrop-blur-md text-blue-300 border border-brand-cta/30 text-xs font-bold tracking-wider uppercase mb-4 inline-block">Mới ra mắt</span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{heroProduct1?.name || "Khám phá Sản phẩm mới"}</h3>
              <p className="text-slate-300 mb-8 line-clamp-2 text-base">{heroProduct1?.description || "Trải nghiệm những thiết bị công nghệ hàng đầu."}</p>
              <Link to={heroProduct1 ? `/product/${heroProduct1.slug}` : "/search"} className="inline-flex items-center gap-2 bg-white text-brand-dark px-7 py-3.5 rounded-2xl font-bold hover:bg-brand-cta hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand-cta/30">
                Mua ngay <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-auto md:h-[420px] relative group shadow-soft hover:shadow-hover transition-all duration-500">
            <img src={settings?.bannerUrl2 || heroProduct2?.images?.[0]?.url || "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800"} alt="Promo 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase mb-3 inline-block">Đang Hot</span>
              <h3 className="text-3xl font-extrabold tracking-tight mb-2 line-clamp-1">{heroProduct2?.name || "Ưu đãi hấp dẫn"}</h3>
              <p className="text-slate-300 mb-5">{heroProduct2?.basePrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(heroProduct2.basePrice) : "Giảm đến 30%"}</p>
              <Link to={heroProduct2 ? `/product/${heroProduct2.slug}` : "/search"} className="inline-flex items-center gap-1 text-sm font-bold text-white hover:text-rose-300 transition-colors">
                Khám phá <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Menu */}
        <section className="bg-white rounded-[32px] shadow-soft p-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">Danh mục Nổi bật</h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {categories.map((cat: any) => (
              <Link key={cat.id} to={`/search?category=${cat.id}`} className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[20px] bg-brand-bg flex items-center justify-center text-slate-400 group-hover:bg-brand-cta group-hover:text-white transition-all duration-500 group-hover:shadow-hover group-hover:-translate-y-2">
                  <span className="font-extrabold text-2xl md:text-3xl">{cat.name.charAt(0)}</span>
                </div>
                <span className="text-sm text-center text-brand-muted font-semibold group-hover:text-brand-dark transition-colors line-clamp-2">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Mock */}
        <section className="bg-white rounded-[32px] shadow-soft p-8 overflow-hidden">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-rose-600 tracking-tight flex items-center gap-2">
                <Zap className="fill-rose-600 w-8 h-8" /> Flash Sale
              </h2>
              <p className="text-brand-muted mt-2 font-medium">Kết thúc trong 02:45:30</p>
            </div>
            <Link to="/search" className="text-sm font-bold text-brand-muted hover:text-brand-cta flex items-center transition-colors">
              Xem tất cả <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-brand-cta" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.slice(0, 5).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Daily Discover */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">Dành riêng cho bạn</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-brand-cta" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Link to="/search">
                  <button className="bg-white border-2 border-slate-200 text-brand-dark px-10 py-4 rounded-2xl font-bold hover:border-brand-cta hover:text-brand-cta hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
                    Xem thêm sản phẩm
                  </button>
                </Link>
              </div>
            </>
          )}
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
