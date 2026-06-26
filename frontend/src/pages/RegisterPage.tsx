import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, Mail, User } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { apiClient } from '../api/axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      // Đăng ký thành công, tự động chuyển về trang Đăng nhập
      navigate('/login');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message;
      if (Array.isArray(errorMsg)) {
        setError(errorMsg[0]);
      } else {
        setError(errorMsg || 'Đăng ký thất bại. Email có thể đã tồn tại.');
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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tạo tài khoản mới</h2>
          <p className="text-sm text-slate-500 mt-2">Bắt đầu trải nghiệm mua sắm tuyệt vời</p>
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
              <User className="w-5 h-5" />
            </div>
            <Input 
              label="Họ và tên" 
              name="name"
              type="text" 
              placeholder="Nguyễn Văn A"
              className="pl-11"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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

          <div className="relative">
            <div className="absolute top-9 left-3.5 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <Input 
              label="Nhập lại Mật khẩu" 
              name="confirmPassword"
              type="password" 
              placeholder="••••••••"
              className="pl-11"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} className="mt-8 h-12 text-base">
            Đăng ký ngay
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
