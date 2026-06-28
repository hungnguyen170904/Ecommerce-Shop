import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCompareStore } from '../store/useCompareStore';
import { Button } from '../components/Button';
import { X, ArrowLeft, ArrowRightLeft } from 'lucide-react';

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
              So sánh Sản phẩm
            </h1>
            <p className="text-slate-500 mt-2">So sánh các tính năng và giá cả để đưa ra lựa chọn tốt nhất.</p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" onClick={clearCompare} className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300">
              Xóa tất cả
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRightLeft className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Chưa có sản phẩm nào</h2>
            <p className="text-slate-500 mb-8">Bạn chưa thêm sản phẩm nào vào danh sách so sánh.</p>
            <Link to="/search">
              <Button>Khám phá sản phẩm</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <tbody>
                {/* Dòng Hình ảnh & Tên */}
                <tr>
                  <td className="p-6 bg-slate-50 w-48 font-bold text-slate-700 border-r border-b border-slate-200 align-top">
                    Sản phẩm
                  </td>
                  {items.map((product) => (
                    <td key={product.id} className="p-6 border-b border-slate-200 text-center relative w-[300px] align-top">
                      <button 
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img 
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                        alt={product.name} 
                        className="w-40 h-40 object-cover mx-auto rounded-xl bg-slate-50 mb-4"
                      />
                      <h3 className="font-bold text-slate-900 line-clamp-2 min-h-[48px]">
                        <Link to={`/product/${product.slug}`} className="hover:text-indigo-600">
                          {product.name}
                        </Link>
                      </h3>
                    </td>
                  ))}
                  {/* Cột trống nếu chưa đủ 3 sản phẩm */}
                  {Array.from({ length: 3 - items.length }).map((_, i) => (
                    <td key={`empty-img-${i}`} className="p-6 border-b border-slate-200 text-center align-middle bg-slate-50/50 w-[300px]">
                      <div className="w-40 h-40 mx-auto rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center mb-4">
                        <span className="text-slate-400 text-sm">Thêm sản phẩm</span>
                      </div>
                      <Link to="/search">
                        <Button variant="outline" size="sm">Tìm kiếm</Button>
                      </Link>
                    </td>
                  ))}
                </tr>

                {/* Dòng Giá */}
                <tr>
                  <td className="p-4 px-6 bg-slate-50 font-bold text-slate-700 border-r border-b border-slate-200">
                    Giá bán
                  </td>
                  {items.map((product) => (
                    <td key={`price-${product.id}`} className="p-4 px-6 border-b border-slate-200 text-center text-lg font-extrabold text-indigo-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                    </td>
                  ))}
                  {Array.from({ length: 3 - items.length }).map((_, i) => (
                    <td key={`empty-price-${i}`} className="p-4 px-6 border-b border-slate-200 bg-slate-50/50"></td>
                  ))}
                </tr>

                {/* Dòng Thương hiệu */}
                <tr>
                  <td className="p-4 px-6 bg-slate-50 font-bold text-slate-700 border-r border-b border-slate-200">
                    Thương hiệu
                  </td>
                  {items.map((product) => (
                    <td key={`brand-${product.id}`} className="p-4 px-6 border-b border-slate-200 text-center font-medium text-slate-700">
                      {product.brand?.name || 'Đang cập nhật'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - items.length }).map((_, i) => (
                    <td key={`empty-brand-${i}`} className="p-4 px-6 border-b border-slate-200 bg-slate-50/50"></td>
                  ))}
                </tr>

                {/* Dòng Phân loại */}
                <tr>
                  <td className="p-4 px-6 bg-slate-50 font-bold text-slate-700 border-r border-b border-slate-200">
                    Phân loại
                  </td>
                  {items.map((product) => (
                    <td key={`variants-${product.id}`} className="p-4 px-6 border-b border-slate-200 text-center text-sm text-slate-600">
                      {product.variants && product.variants.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {product.variants.map((v: any) => (
                            <span key={v.id} className="px-2 py-1 bg-slate-100 rounded text-xs">{v.color || v.sku}</span>
                          ))}
                        </div>
                      ) : (
                        'Mặc định'
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 3 - items.length }).map((_, i) => (
                    <td key={`empty-variants-${i}`} className="p-4 px-6 border-b border-slate-200 bg-slate-50/50"></td>
                  ))}
                </tr>

                {/* Dòng Mô tả */}
                <tr>
                  <td className="p-4 px-6 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                    Mô tả
                  </td>
                  {items.map((product) => (
                    <td key={`desc-${product.id}`} className="p-4 px-6 border-slate-200 text-sm text-slate-600 align-top">
                      <p className="line-clamp-4">{product.description}</p>
                    </td>
                  ))}
                  {Array.from({ length: 3 - items.length }).map((_, i) => (
                    <td key={`empty-desc-${i}`} className="p-4 px-6 border-slate-200 bg-slate-50/50"></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
