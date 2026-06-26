import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { apiClient } from '../api/axios';
import { Loader2, PackageX, Filter } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          apiClient.get(`/products?categorySlug=${slug}`),
          apiClient.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu danh mục:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const currentCategory = categories.find(c => c.slug === slug);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Bộ lọc danh mục */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sticky top-28">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-600" />
              TẤT CẢ DANH MỤC
            </h2>
            <ul className="space-y-1 text-sm">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${cat.slug}`} 
                    className={`block py-2 px-3 rounded-lg transition-colors ${cat.slug === slug ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <h1 className="text-xl font-bold text-slate-900">
              {currentCategory ? currentCategory.name : 'Danh mục sản phẩm'}
            </h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageX className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Chưa có sản phẩm nào</h2>
              <p className="text-slate-500">Danh mục này hiện đang trống. Vui lòng quay lại sau.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
