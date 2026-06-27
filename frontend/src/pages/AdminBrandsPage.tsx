import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Loader2, Plus, Edit2, Trash2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ImageInput, uploadImageFile } from '../components/ImageInput';
import toast from 'react-hot-toast';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logoUrl: ''
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/brands');
      setBrands(response.data);
    } catch (error) {
      console.error('Lỗi khi tải nhãn hàng', error);
      toast.error('Không thể tải danh sách nhãn hàng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (brand?: any) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        description: brand.description || '',
        logoUrl: brand.logoUrl || ''
      });
      setLogoFile(null);
    } else {
      setEditingBrand(null);
      setFormData({ name: '', description: '', logoUrl: '' });
      setLogoFile(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (url: string, file: File | null) => {
    setFormData({ ...formData, logoUrl: url });
    setLogoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalLogoUrl = formData.logoUrl;

      if (logoFile) {
        finalLogoUrl = await uploadImageFile(logoFile);
      }

      const payload = {
        ...formData,
        logoUrl: finalLogoUrl
      };

      if (editingBrand) {
        await apiClient.put(`/brands/${editingBrand.id}`, payload);
        toast.success('Cập nhật nhãn hàng thành công');
      } else {
        await apiClient.post('/brands', payload);
        toast.success('Thêm nhãn hàng mới thành công');
      }
      setIsModalOpen(false);
      fetchBrands();
    } catch (error: any) {
      console.error('Lỗi lưu nhãn hàng:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi lưu nhãn hàng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa nhãn hàng này?')) return;
    try {
      await apiClient.delete(`/brands/${id}`);
      toast.success('Xóa nhãn hàng thành công');
      fetchBrands();
    } catch (error) {
      console.error('Lỗi xóa nhãn hàng:', error);
      toast.error('Không thể xóa nhãn hàng');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          Quản lý Nhãn hàng (Brands)
        </h2>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm nhãn hàng mới
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nhãn hàng</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                        {brand.logoUrl ? (
                          <img 
                            src={brand.logoUrl.startsWith('/') ? `http://localhost:3000${brand.logoUrl}` : brand.logoUrl} 
                            alt={brand.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-slate-400">{brand.name.charAt(0)}</span>
                        )}
                      </div>
                      <p className="font-bold text-slate-900">{brand.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                    {brand.description || <span className="text-slate-400 italic">Không có mô tả</span>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(brand)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(brand.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && brands.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    Chưa có nhãn hàng nào. Hãy thêm mới!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingBrand ? 'Chỉnh sửa Nhãn hàng' : 'Thêm Nhãn hàng mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="brandForm" onSubmit={handleSubmit} className="space-y-6">
                <Input 
                  label="Tên Nhãn hàng (VD: Apple)" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                
                <ImageInput 
                  label="Logo Nhãn hàng"
                  initialUrl={formData.logoUrl}
                  onImageChange={handleImageChange}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả giới thiệu</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm h-24 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
              <Button type="submit" form="brandForm" isLoading={isSubmitting}>
                {editingBrand ? 'Lưu thay đổi' : 'Tạo nhãn hàng'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
