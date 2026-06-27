import { AdminLayout } from '../components/AdminLayout';
import { PackageSearch, Plus, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [addQuantity, setAddQuantity] = useState<number>(0);
  const [addNotes, setAddNotes] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Lỗi khi tải kho hàng', error);
      toast.error('Không thể tải dữ liệu kho hàng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddModal = (variant: any) => {
    setSelectedVariant(variant);
    setAddQuantity(0);
    setAddNotes('');
    setShowAddModal(true);
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addQuantity <= 0) {
      toast.error('Số lượng nhập phải lớn hơn 0');
      return;
    }
    
    try {
      await apiClient.post('/inventory/add', {
        variantId: selectedVariant.id,
        quantity: addQuantity,
        notes: addNotes
      });
      toast.success('Nhập kho thành công');
      setShowAddModal(false);
      fetchInventory();
    } catch (error) {
      console.error('Lỗi nhập kho', error);
      toast.error('Có lỗi xảy ra khi nhập kho');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Kho hàng</h1>
          <p className="text-slate-500 text-sm mt-1">Theo dõi tồn kho bằng kiến trúc Event-Sourced</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
        ) : inventory.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <PackageSearch className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Chưa có dữ liệu kho</h3>
            <p className="text-slate-500">Hãy thêm sản phẩm và biến thể trước.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                  <th className="px-6 py-4 font-semibold">SKU / Phân loại</th>
                  <th className="px-6 py-4 font-semibold text-right">Giá trị</th>
                  <th className="px-6 py-4 font-semibold text-center">Tồn kho hiện tại</th>
                  <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 line-clamp-1">{item.productName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-xs mb-1">
                        {item.sku}
                      </span>
                      <div className="text-xs text-slate-500">{item.color} {item.size ? `- ${item.size}` : ''}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price || 0)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold ${
                        item.stock <= 0 
                          ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                          : item.stock < 10 
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        {item.stock}
                        {item.stock < 10 && <AlertCircle className="w-3.5 h-3.5" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" onClick={() => handleOpenAddModal(item)} className="gap-1.5">
                        <Plus className="w-4 h-4" /> Nhập kho
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && selectedVariant && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Nhập kho sản phẩm</h3>
            </div>
            
            <form onSubmit={handleAddStock} className="p-6">
              <div className="mb-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900">
                <p className="font-semibold line-clamp-1 mb-1">{selectedVariant.productName}</p>
                <p className="text-sm">SKU: <span className="font-mono bg-white px-1.5 rounded text-indigo-600 border border-indigo-200">{selectedVariant.sku}</span></p>
                <p className="text-sm">Tồn hiện tại: <strong>{selectedVariant.stock}</strong></p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số lượng nhập thêm</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={addQuantity}
                    onChange={e => setAddQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú (Tùy chọn)</label>
                  <input 
                    type="text" 
                    placeholder="VD: Nhập lô hàng từ nhà cung cấp A"
                    value={addNotes}
                    onChange={e => setAddNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Hủy</Button>
                <Button type="submit">Xác nhận nhập kho</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
