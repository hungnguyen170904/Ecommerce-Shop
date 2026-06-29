import { useState, useEffect } from 'react';
import { UploadCloud, Link as LinkIcon } from 'lucide-react';
import { apiClient } from '../api/axios';

interface ImageInputProps {
  label?: string;
  initialUrl?: string;
  onImageChange: (url: string, file: File | null) => void;
}

export function ImageInput({ label = "Hình ảnh", initialUrl = "", onImageChange }: ImageInputProps) {
  const [mode, setMode] = useState<'FILE' | 'URL'>('FILE');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (!imageFile) {
      setImageUrl(initialUrl);
      setPreview(initialUrl ? (initialUrl.startsWith('/') ? `http://localhost:3000${initialUrl}` : initialUrl) : '');
    }
  }, [initialUrl, imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      onImageChange('', file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreview(url);
    setImageFile(null);
    onImageChange(url, null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      
      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-lg w-fit mb-3">
        <button
          type="button"
          onClick={() => setMode('FILE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            mode === 'FILE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <UploadCloud className="w-4 h-4" /> Tải lên từ máy
        </button>
        <button
          type="button"
          onClick={() => setMode('URL')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            mode === 'URL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <LinkIcon className="w-4 h-4" /> Nhập URL trực tiếp
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Preview Box */}
        <div className="w-20 h-20 rounded-xl border border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden flex-shrink-0">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Lỗi+Ảnh';
            }}/>
          ) : (
            <span className="text-xs text-slate-400">Trống</span>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-1">
          {mode === 'FILE' ? (
            <div>
              <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-2">Chấp nhận JPG, PNG, WEBP. Kích thước &lt; 5MB</p>
            </div>
          ) : (
            <div>
              <input 
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <p className="text-xs text-slate-500 mt-2">Nhập đường dẫn trực tiếp đến hình ảnh.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Utility function to upload image file if needed
export const uploadImageFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.url;
};
