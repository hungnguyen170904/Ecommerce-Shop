import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, Mail } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { apiClient } from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', formData);
      const { access_token, user } = response.data;
      setAuth(access_token, user);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message;
      if (Array.isArray(errorMsg)) {
        setError(errorMsg[0]);
      } else {
        setError(errorMsg || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 transition-all">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-6 shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Chào mừng trở lại!</h2>
          <p className="text-sm text-slate-500 mt-2">Vui lòng đăng nhập để tiếp tục mua sắm</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute top-9 left-3.5 text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <Input 
              label="Email" 
              name="email"
              type="email" 
              placeholder="you@example.com"
              className="pl-11"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <div className="absolute top-9 left-3.5 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <Input 
              label="Mật khẩu" 
              name="password"
              type="password" 
              placeholder="••••••••"
              className="pl-11"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" />
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Ghi nhớ tôi</span>
            </label>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} className="mt-6 h-12 text-base">
            Đăng nhập ngay
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
              Tạo tài khoản mới
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
