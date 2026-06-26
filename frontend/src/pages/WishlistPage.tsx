import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { apiClient } from '../api/axios';
import { Heart, Trash2, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await apiClient.get('/users/profile/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.error('Lỗi khi tải wishlist', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await apiClient.post(`/users/profile/wishlist/${productId}`);
      setWishlist(wishlist.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Lỗi khi xóa khỏi wishlist', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sản phẩm yêu thích</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-rose-50 text-rose-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Chưa có sản phẩm yêu thích</h2>
            <p className="text-slate-500 mb-8">Hãy lướt xem và thả tim những sản phẩm bạn muốn mua sau nhé.</p>
            <Link to="/">
              <Button className="px-8">Khám phá ngay</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product: any) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-50">
                  <img 
                    src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors shadow-sm"
                    title="Bỏ yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 flex-1">
                  <Link to={`/product/${product.id}`} className="hover:text-indigo-600 transition-colors">
                    {product.name}
                  </Link>
                </h3>
                
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-lg font-bold text-indigo-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                    </p>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-md">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
