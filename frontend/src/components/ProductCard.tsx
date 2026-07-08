import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRightLeft, Star } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';
import { useCartStore } from '../store/useCartStore';
import { apiClient } from '../api/axios';
import toast from 'react-hot-toast';

interface Variant { price: number; }
interface Product {
  id: string; name: string; slug: string; basePrice: number;
  brand?: { name: string }; images: { url: string }[]; variants: Variant[];
}

export function ProductCard({ product }: { product: Product }) {
  const price = product.variants?.[0]?.price ?? product.basePrice;
  const originalPrice = product.basePrice;
  const discount = price < originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop';
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const compareItems = useCompareStore((state) => state.items);
  const isCompared = compareItems.some(item => item.id === product.id);
  const { fetchCart } = useCartStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.variants?.[0]) {
      toast.error('Sản phẩm chưa có biến thể');
      return;
    }
    try {
      await apiClient.post('/cart', { variantId: product.variants[0].id, quantity: 1 });
      await fetchCart();
      toast.success('Đã thêm vào giỏ hàng!');
    } catch {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ');
    }
  };

  return (
    <div className="group bg-white rounded-[22px] overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-400 flex flex-col relative h-full border border-blue-50">
      <Link to={`/product/${product.slug}`} className="flex flex-col flex-grow">

        {/* Ảnh sản phẩm */}
        <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
          {/* Gradient overlay dưới ảnh */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />

          {/* Badge giảm giá */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
              -{discount}%
            </div>
          )}

          {/* Badge thương hiệu */}
          {product.brand && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
              {product.brand.name}
            </div>
          )}

          {/* Nút thêm giỏ hàng — slide up khi hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> Thêm vào giỏ
            </button>
          </div>
        </div>

        {/* Thông tin */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Rating giả */}
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} />
            ))}
            <span className="text-xs text-slate-400 ml-1">(128)</span>
          </div>

          <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors text-sm leading-snug min-h-[40px]">
            {product.name}
          </h3>

          <div className="mt-auto pt-2 flex items-end justify-between">
            <div>
              <span className="font-extrabold text-blue-600 text-base">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
              </span>
              {discount > 0 && (
                <p className="text-xs text-slate-400 line-through">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Nút so sánh */}
      <div className="absolute bottom-[72px] right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCompare(product); }}
          className={`w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-card transition-all duration-300 ${isCompared ? 'text-blue-600 ring-2 ring-blue-200' : 'text-slate-400 hover:text-blue-600 hover:scale-110'}`}
          title="So sánh"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
