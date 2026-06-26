import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { FolderTree, Plus, Edit, Trash2, Loader2, Folder } from 'lucide-react';
import { Button } from '../components/Button';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh mục', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCategory) {
        await apiClient.put(`/categories/admin/${editCategory.id}`, formData);
      } else {
        await apiClient.post('/categories/admin', formData);
      }
      setShowAddModal(false);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục', error);
      alert('Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      await apiClient.delete(`/categories/admin/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Lỗi khi xóa', error);
      alert('Không thể xóa danh mục này (có thể do danh mục đã có sản phẩm).');
    }
  };

  const openAddModal = () => {
    setEditCategory(null);
    setFormData({ name: '', slug: '', description: '' });
    setShowAddModal(true);
  };

  const openEditModal = (cat: any) => {
    setEditCategory(cat);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '' });
    setShowAddModal(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <FolderTree className="w-6 h-6 text-indigo-600" />
          Quản lý Danh Mục
        </h2>
        <Button onClick={openAddModal} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm Danh Mục
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Tên Danh Mục</th>
                <th className="px-6 py-4">Đường Dẫn (Slug)</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Chưa có danh mục nào.
                  </td>
                </tr>
              ) : categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Folder className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{cat.slug}</td>
                  <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{cat.description || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(cat)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">{editCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tên Danh mục</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="VD: Điện thoại di động"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn (Slug)</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    value={formData.slug}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả (Tùy chọn)</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Hủy</Button>
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
