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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Banner Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[16/9] relative group">
            <img src={settings?.bannerUrl1 || "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800"} alt="Promo 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium mb-1">Mới ra mắt</p>
              <h3 className="text-2xl font-bold">iPhone 15 Pro</h3>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[16/9] relative group">
            <img src={settings?.bannerUrl2 || "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800"} alt="Promo 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium mb-1">Giảm đến 30%</p>
              <h3 className="text-2xl font-bold">Macbook Air M2</h3>
            </div>
          </div>
        </section>

        {/* Categories Menu */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-bold text-slate-800 uppercase mb-6">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map((cat: any) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-indigo-100 group-hover:shadow-md">
                  <span className="font-bold text-xl">{cat.name.charAt(0)}</span>
                </div>
                <span className="text-xs text-center text-slate-600 font-medium group-hover:text-indigo-600 line-clamp-2">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Mock */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-rose-600 flex items-center gap-2 italic">
              <Zap className="fill-rose-600" /> FLASH SALE
            </h2>
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center">
              Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.slice(0, 5).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Daily Discover */}
        <section className="mb-12">
          <div className="bg-white border-b-2 border-indigo-600 sticky top-20 z-40 p-4 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-600 text-center uppercase tracking-widest">Gợi Ý Hôm Nay</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <button className="bg-white border border-slate-300 text-slate-600 px-24 py-3.5 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
                  Xem thêm
                </button>
              </div>
            </>
          )}
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
