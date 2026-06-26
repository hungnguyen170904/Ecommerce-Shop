import { Link } from 'react-router-dom';

interface Variant {
  price: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  brand?: { name: string };
  images: { url: string }[];
  variants: Variant[];
}

export function ProductCard({ product }: { product: Product }) {
  // Lấy giá thực tế (có thể biến thể có giá khác basePrice, ở đây lấy basePrice cho đơn giản)
  const price = product.basePrice;
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop';

  return (
    <Link 
      to={`/product/${product.slug}`} 
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.brand && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
            {product.brand.name}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-bold text-lg text-indigo-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
