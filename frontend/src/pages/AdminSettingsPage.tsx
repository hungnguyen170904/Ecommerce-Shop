import { AdminLayout } from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { Settings, Save, Building2, CreditCard, UserCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageInput, uploadImageFile } from '../components/ImageInput';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: '',
    bankName: '',
    bankAccount: '',
    bankAccountName: '',
    bannerUrl1: '',
    bannerUrl2: '',
    logoUrl: ''
  });
  const [bannerFile1, setBannerFile1] = useState<File | null>(null);
  const [bannerFile2, setBannerFile2] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/settings');
      setSettings({
        siteName: response.data.siteName || '',
        bankName: response.data.bankName || '',
        bankAccount: response.data.bankAccount || '',
        bankAccountName: response.data.bankAccountName || '',
        bannerUrl1: response.data.bannerUrl1 || '',
        bannerUrl2: response.data.bannerUrl2 || '',
        logoUrl: response.data.logoUrl || '',
      });
    } catch (error) {
      console.error('Lỗi khi tải cài đặt', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalBanner1 = settings.bannerUrl1;
      let finalBanner2 = settings.bannerUrl2;
      let finalLogo = settings.logoUrl;

      if (bannerFile1) {
        finalBanner1 = await uploadImageFile(bannerFile1);
      }
      if (bannerFile2) {
        finalBanner2 = await uploadImageFile(bannerFile2);
      }
      if (logoFile) {
        finalLogo = await uploadImageFile(logoFile);
      }

      await apiClient.put('/settings', {
        ...settings,
        bannerUrl1: finalBanner1,
        bannerUrl2: finalBanner2,
        logoUrl: finalLogo
      });
      alert('Lưu cài đặt thành công!');
    } catch (error) {
      console.error('Lỗi lưu cài đặt:', error);
      alert('Có lỗi xảy ra khi lưu.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600" />
          Cài đặt Hệ thống
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 max-w-3xl">
        <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
          Cấu hình Thanh toán Chuyển khoản (Mã QR)
        </h3>
        
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <span className="text-slate-400">Đang tải cấu hình...</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-1 mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Settings className="w-4 h-4 text-slate-400" /> Tên Cửa Hàng (Site Name)
              </label>
              <input 
                type="text" 
                placeholder="Ví dụ: My Shop"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-medium" 
                value={settings.siteName}
                onChange={e => setSettings({...settings, siteName: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Building2 className="w-4 h-4 text-slate-400" /> Ngân hàng
                </label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: MB Bank, Vietcombank..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  value={settings.bankName}
                  onChange={e => setSettings({...settings, bankName: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Số tài khoản
                </label>
                <input 
                  type="text" 
                  placeholder="Nhập số tài khoản"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  value={settings.bankAccount}
                  onChange={e => setSettings({...settings, bankAccount: e.target.value})}
                />
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <UserCircle className="w-4 h-4 text-slate-400" /> Tên chủ tài khoản
                </label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: NGUYEN VAN A"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 uppercase" 
                  value={settings.bankAccountName}
                  onChange={e => setSettings({...settings, bankAccountName: e.target.value.toUpperCase()})}
                />
              </div>
            </div>

            {/* Banner Settings */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <UserCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Banner Trang Chủ</h3>
                    <p className="text-sm text-slate-500">Tùy chỉnh hình ảnh quảng cáo chính</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <ImageInput 
                    label="Logo Hệ thống"
                    initialUrl={settings.logoUrl}
                    onImageChange={(url, file) => {
                      setSettings({...settings, logoUrl: url});
                      setLogoFile(file);
                    }}
                  />
                  <div className="border-t border-slate-100 pt-4">
                    <ImageInput 
                      label="Banner 1"
                      initialUrl={settings.bannerUrl1}
                      onImageChange={(url, file) => {
                        setSettings({...settings, bannerUrl1: url});
                        setBannerFile1(file);
                      }}
                    />
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <ImageInput 
                      label="Banner 2"
                      initialUrl={settings.bannerUrl2}
                      onImageChange={(url, file) => {
                        setSettings({...settings, bannerUrl2: url});
                        setBannerFile2(file);
                      }}
                    />
                  </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <Button type="submit" isLoading={isSaving} className="gap-2 px-8">
                <Save className="w-4 h-4" /> Lưu cấu hình
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
