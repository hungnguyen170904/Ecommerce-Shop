import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { apiClient } from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { Loader2, ArrowLeft, ShoppingCart, ShieldCheck, Truck, CheckCircle2, Minus, Plus, Heart, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const user = useAuthStore(state => state.user);
  const fetchCart = useCartStore(state => state.fetchCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        setProduct(response.data);
        if (response.data.variants?.length > 0) {
          setSelectedVariant(response.data.variants[0]);
        }
        
        // Fetch reviews after product is loaded
        const reviewsRes = await apiClient.get(`/reviews/product/${response.data.id}`);
        setReviews(reviewsRes.data);

        // Check if wishlisted if user is logged in
        if (user) {
          const wlRes = await apiClient.get('/users/profile/wishlist');
          const isWl = wlRes.data.some((p: any) => p.id === response.data.id);
          setIsWishlisted(isWl);
        }
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/" className="text-indigo-600 hover:underline">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsAddingToCart(true);
    try {
      await apiClient.post('/cart', {
        variantId: selectedVariant.id,
        quantity: quantity
      });
      fetchCart();
      toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng.');
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await apiClient.post(`/users/profile/wishlist/${product.id}`);
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Lỗi lưu wishlist', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsSubmittingReview(true);
    setReviewError('');
    try {
      await apiClient.post('/reviews', {
        productId: product.id,
        rating: newReview.rating,
        comment: newReview.comment
      });
      // Tải lại reviews
      const reviewsRes = await apiClient.get(`/reviews/product/${product.id}`);
      setReviews(reviewsRes.data);
      setNewReview({ rating: 5, comment: '' });
      alert('Cảm ơn bạn đã đánh giá sản phẩm!');
    } catch (error: any) {
      setReviewError(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const currentPrice = selectedVariant?.price || product?.basePrice;
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
            
            {/* Left: Product Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100">
                <img 
                  src={imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail grid would go here if we had multiple images */}
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              {product.brand && (
                <div className="mb-3 text-indigo-600 font-semibold tracking-wide uppercase text-sm">
                  {product.brand.name}
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                {product.name}
              </h1>
              
              <div className="text-3xl font-extrabold text-indigo-600 mb-6">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentPrice)}
              </div>

              {/* Variants Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8 border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Lựa chọn Màu sắc / Phiên bản:</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`
                          px-4 py-2 text-sm font-medium rounded-xl border-2 transition-all
                          ${selectedVariant?.id === variant.id 
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}
                      >
                        {variant.color || variant.sku}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium text-slate-700">Số lượng:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden h-10">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 h-full flex items-center justify-center font-medium text-slate-900 border-x border-slate-200">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1 h-14 text-base shadow-lg shadow-indigo-200"
                    onClick={() => {
                      handleAddToCart().then(() => {
                        if (user) navigate('/cart');
                      });
                    }}
                    isLoading={isAddingToCart}
                  >
                    Mua ngay
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`h-14 px-6 border-2 transition-all ${addedSuccess ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : ''}`}
                    onClick={handleAddToCart}
                    isLoading={isAddingToCart}
                  >
                    {addedSuccess ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </Button>
                  <button 
                    onClick={handleToggleWishlist}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                      isWishlisted 
                        ? 'bg-rose-50 border-rose-200 text-rose-500' 
                        : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                    }`}
                    title={isWishlisted ? "Bỏ yêu thích" : "Yêu thích"}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
                {addedSuccess && (
                  <div className="text-sm font-medium text-emerald-600 text-center animate-fade-in">
                    Đã thêm sản phẩm vào giỏ hàng thành công!
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Bảo hành 12 tháng</p>
                    <p className="text-xs text-slate-500">Chính hãng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Giao hàng miễn phí</p>
                    <p className="text-xs text-slate-500">Toàn quốc</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Thông tin sản phẩm</h3>
                <div className="prose prose-slate text-slate-600">
                  <p>{product.description}</p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Đánh giá khách hàng</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form Đánh giá */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-4">Viết đánh giá của bạn</h4>
                  {reviewError && (
                    <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100">
                      {reviewError}
                    </div>
                  )}
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Đánh giá sao</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nhận xét</label>
                      <textarea 
                        required
                        placeholder="Bạn nghĩ gì về sản phẩm này?"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm min-h-[120px] resize-none"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      />
                    </div>
                    <Button type="submit" fullWidth isLoading={isSubmittingReview}>
                      Gửi đánh giá
                    </Button>
                    <p className="text-xs text-slate-500 text-center mt-2">
                      * Chỉ khách hàng đã mua và nhận hàng mới được đánh giá.
                    </p>
                  </form>
                </div>
              </div>

              {/* Danh sách Đánh giá */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-slate-900">{review.user.name}</p>
                          <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
