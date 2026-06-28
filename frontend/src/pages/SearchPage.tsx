import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { apiClient } from '../api/axios';
import { Loader2, Search, Filter, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCartStore } from '../store/useCartStore';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || '';
  
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Advanced Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{min: string, max: string}>({min: '', max: ''});
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const navigate = useNavigate();
  const fetchCart = useCartStore(state => state.fetchCart);

  useEffect(() => {
    fetchInitialData();
  }, []); // Only fetch once when page loads

  useEffect(() => {
    applyFilters();
  }, [allProducts, query, categoryId, selectedBrand, priceRange, sortBy]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        apiClient.get('/products'), 
        apiClient.get('/categories'),
        apiClient.get('/brands')
      ]);
      setAllProducts(prodRes.data);
      setCategories(catRes.data);
      setBrands(brandRes.data);
    } catch (error) {
      console.error('Lỗi tải dữ liệu', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allProducts];

    if (query) {
      const q = query.toLowerCase();
        filtered = filtered.filter((p: any) => 
          p.name.toLowerCase().includes(q) || 
          p.description?.toLowerCase().includes(q)
        );
      }
      
      if (categoryId) {
        filtered = filtered.filter((p: any) => 
          p.categories?.some((c: any) => c.categoryId === categoryId)
        );
      }

      if (selectedBrand) {
        filtered = filtered.filter((p: any) => p.brandId === selectedBrand);
      }

      if (priceRange.min) {
        filtered = filtered.filter((p: any) => p.basePrice >= parseInt(priceRange.min));
      }
      if (priceRange.max) {
        filtered = filtered.filter((p: any) => p.basePrice <= parseInt(priceRange.max));
      }

    if (sortBy === 'price_asc') {
      filtered.sort((a: any, b: any) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a: any, b: any) => b.basePrice - a.basePrice);
    } else {
      // newest
      filtered.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setProducts(filtered);
  };

  const handleAddToCart = async (product: any) => {
    try {
      await apiClient.post('/cart', {
        variantId: product.variants?.[0]?.id,
        quantity: 1
      });
      fetchCart();
      alert('Đã thêm vào giỏ hàng!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        alert('Có lỗi xảy ra khi thêm vào giỏ hàng.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-indigo-600" /> Bộ lọc tìm kiếm
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Danh mục</h4>
                <div className="space-y-2">
                  <Link 
                    to={`/search${query ? `?q=${query}` : ''}`}
                    className={`block text-sm ${!categoryId ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-indigo-600'}`}
                  >
                    Tất cả danh mục
                  </Link>
                  {categories.map(cat => (
                    <Link 
                      key={cat.id} 
                      to={`/search?category=${cat.id}${query ? `&q=${query}` : ''}`}
                      className={`block text-sm ${categoryId === cat.id ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-indigo-600'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Lọc theo Nhãn hàng */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Nhãn hàng</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="brand" 
                      checked={selectedBrand === ''}
                      onChange={() => setSelectedBrand('')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-600">Tất cả</span>
                  </label>
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === brand.id}
                        onChange={() => setSelectedBrand(brand.id)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-600">{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Lọc theo Giá */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Khoảng giá</h4>
                <div className="flex items-center gap-2 mb-3">
                  <input 
                    type="number" 
                    placeholder="Tối thiểu"
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  />
                  <span className="text-slate-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Tối đa"
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs py-1"
                    onClick={() => setPriceRange({min: '', max: ''})}
                  >Xóa</Button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {query ? `Kết quả tìm kiếm cho "${query}"` : categoryId ? 'Danh mục sản phẩm' : 'Tất cả sản phẩm'}
              </h2>
              <p className="text-slate-500 mt-1">Tìm thấy {products.length} sản phẩm</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sắp xếp:</span>
              <select 
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy kết quả nào</h2>
              <p className="text-slate-500 mb-8">Thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
              <Link to="/">
                <Button className="px-8 border-2" variant="outline">Xóa bộ lọc</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col group">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-50">
                    <img 
                      src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 flex-1 text-sm">
                    <Link to={`/product/${product.slug}`} className="hover:text-indigo-600 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-lg font-bold text-indigo-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
