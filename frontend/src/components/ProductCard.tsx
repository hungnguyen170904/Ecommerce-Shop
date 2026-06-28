import { Link } from 'react-router-dom';
import { ArrowRightLeft } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';

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
  const price = product.basePrice;
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop';
  
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const compareItems = useCompareStore((state) => state.items);
  const isCompared = compareItems.some(item => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      <Link 
        to={`/product/${product.slug}`} 
        className="flex flex-col flex-grow"
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
      
      {/* Nút thao tác nhanh (hiện khi hover) */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCompare(product);
          }}
          className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-colors ${isCompared ? 'text-blue-600 border border-blue-200' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
          title="So sánh"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
