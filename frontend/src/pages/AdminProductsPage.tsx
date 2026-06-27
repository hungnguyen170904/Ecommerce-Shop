import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Loader2, Package, Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ImageInput, uploadImageFile } from '../components/ImageInput';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    imageUrl: '',
    categoryId: '',
    brandId: '',
    isActive: true,
    variants: [] as any[]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await apiClient.get('/brands');
      setBrands(response.data);
    } catch (error) {
      console.error('Lỗi khi tải nhãn hàng', error);
    }
  };

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
      const prodImage = product.images?.[0]?.url || '';
      setFormData({
        name: product.name,
        description: product.description || '',
        basePrice: product.basePrice.toString(),
        imageUrl: prodImage,
        categoryId: product.categories?.[0]?.categoryId || '',
        brandId: product.brandId || '',
        isActive: product.isActive,
        variants: product.variants || []
      });
      setImageFile(null);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', basePrice: '', imageUrl: '', categoryId: '', brandId: '', isActive: true, variants: [] });
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (url: string, file: File | null) => {
    setFormData({ ...formData, imageUrl: url });
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalImageUrl = formData.imageUrl;

      // Nếu có chọn file mới, tiến hành upload trước
      if (imageFile) {
        finalImageUrl = await uploadImageFile(imageFile);
      }

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        basePrice: parseFloat(formData.basePrice),
        brandId: formData.brandId || null
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

  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { sku: '', size: '', color: '', price: '', isActive: true }]
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({ ...formData, variants: newVariants });
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
                        src={product.images?.[0]?.url ? (product.images[0].url.startsWith('/') ? `http://localhost:3000${product.images[0].url}` : product.images[0].url) : 'https://via.placeholder.com/150'} 
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
                  <ImageInput 
                    initialUrl={formData.imageUrl}
                    onImageChange={handleImageChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                    <select
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nhãn hàng (Brand)</label>
                    <select
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                      value={formData.brandId}
                      onChange={e => setFormData({...formData, brandId: e.target.value})}
                    >
                      <option value="">-- Không chọn --</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm h-32 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                {/* Variants Section */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-slate-800">Phân loại sản phẩm (Biến thể)</h4>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddVariant} className="text-xs py-1.5 h-auto">
                      <Plus className="w-3 h-3 mr-1" /> Thêm loại
                    </Button>
                  </div>
                  
                  {formData.variants.length === 0 ? (
                    <div className="text-center text-xs text-slate-400 italic py-4">Chưa có phân loại nào. Khách hàng sẽ mua sản phẩm mặc định.</div>
                  ) : (
                    <div className="space-y-3">
                      {formData.variants.map((variant, index) => (
                        <div key={index} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative group">
                          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Mã SKU *</label>
                              <input 
                                type="text" 
                                required
                                value={variant.sku}
                                onChange={e => handleVariantChange(index, 'sku', e.target.value)}
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                                placeholder="VD: IP15-256-BLACK"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Màu sắc (Color)</label>
                              <input 
                                type="text" 
                                value={variant.color || ''}
                                onChange={e => handleVariantChange(index, 'color', e.target.value)}
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                                placeholder="VD: Đen"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Dung lượng (Size)</label>
                              <input 
                                type="text" 
                                value={variant.size || ''}
                                onChange={e => handleVariantChange(index, 'size', e.target.value)}
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                                placeholder="VD: 256GB"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Giá bán (Override)</label>
                              <input 
                                type="number" 
                                value={variant.price || ''}
                                onChange={e => handleVariantChange(index, 'price', e.target.value ? parseFloat(e.target.value) : null)}
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                                placeholder="Bỏ trống lấy giá gốc"
                              />
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveVariant(index)}
                            className="text-rose-500 p-1 hover:bg-rose-50 rounded mt-5 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Xóa biến thể"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
