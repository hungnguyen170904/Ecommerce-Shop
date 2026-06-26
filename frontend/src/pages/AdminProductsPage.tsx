import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Loader2, Package, Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    imageUrl: '',
    categoryId: '',
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh mục', error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/products/admin');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        basePrice: product.basePrice.toString(),
        imageUrl: product.images?.[0]?.url || '',
        categoryId: product.categories?.[0]?.categoryId || '',
        isActive: product.isActive
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', basePrice: '', imageUrl: '', categoryId: '', isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice)
      };

      if (editingProduct) {
        await apiClient.put(`/products/${editingProduct.id}`, payload);
      } else {
        await apiClient.post('/products', payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi lưu sản phẩm:', error);
      alert('Có lỗi xảy ra khi lưu sản phẩm.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn XÓA (ẩn) sản phẩm này?')) return;
    try {
      await apiClient.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-indigo-600" />
          Quản lý Sản phẩm
        </h2>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm sản phẩm mới
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Giá bán</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{product.name}</p>
                        <p className="text-xs text-indigo-500 font-medium">{product.categories?.[0]?.category?.name || 'Không có danh mục'}</p>
                        <p className="text-xs text-slate-500 max-w-xs truncate">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                  </td>
                  <td className="px-6 py-4">
                    {product.isActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Đang bán</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">Đã ẩn</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(product)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                      title="Xóa/Ẩn"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  label="Tên sản phẩm" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Giá cơ bản (VNĐ)" 
                    type="number" 
                    required 
                    value={formData.basePrice}
                    onChange={e => setFormData({...formData, basePrice: e.target.value})}
                  />
                  <Input 
                    label="Link Hình ảnh (URL)" 
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                  <select
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={formData.categoryId}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm h-32 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                {editingProduct && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.isActive}
                      onChange={e => setFormData({...formData, isActive: e.target.checked})}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" 
                    />
                    <span className="text-sm font-medium text-slate-700">Trạng thái bán (Active)</span>
                  </label>
                )}
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
              <Button type="submit" form="productForm" isLoading={isSubmitting}>
                {editingProduct ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
