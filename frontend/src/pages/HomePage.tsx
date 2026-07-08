import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { SkeletonLoading } from '../components/SkeletonLoading';
import { apiClient } from '../api/axios';
import { ChevronRight, ChevronLeft, Zap, Smartphone, Laptop, Headphones, Watch, Camera, ShirtIcon, BookOpen, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== HERO SLIDES =====
const HERO_SLIDES = [
  {
    bg: 'from-blue-900 via-blue-800 to-blue-700',
    badge: 'Mới ra mắt 2025',
    badgeColor: 'bg-blue-400/20 text-blue-200 border-blue-400/30',
    title: 'Công Nghệ\nĐỉnh Cao',
    subtitle: 'Trải nghiệm những thiết bị công nghệ hàng đầu thế giới với mức giá ưu đãi nhất.',
    cta: 'Khám phá ngay',
    ctaLink: '/search',
    img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop',
  },
  {
    bg: 'from-indigo-900 via-indigo-800 to-violet-800',
    badge: 'Flash Sale -50%',
    badgeColor: 'bg-rose-400/20 text-rose-200 border-rose-400/30',
    title: 'Giảm Giá\nSiêu Sốc',
    subtitle: 'Hàng ngàn sản phẩm giảm đến 50% — Số lượng có hạn, nhanh tay kẻo hết!',
    cta: 'Mua ngay',
    ctaLink: '/search',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop',
  },
  {
    bg: 'from-sky-900 via-sky-800 to-cyan-800',
    badge: 'Hàng chính hãng',
    badgeColor: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30',
    title: 'Thời Trang\nHiện Đại',
    subtitle: 'Phong cách sống hiện đại với bộ sưu tập thời trang và phụ kiện mới nhất.',
    cta: 'Xem bộ sưu tập',
    ctaLink: '/search',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
  },
];

// ===== CATEGORY ICONS =====
const CAT_ICONS: Record<string, any> = {
  default: Smartphone,
  điện: Smartphone, thoại: Smartphone, phone: Smartphone,
  laptop: Laptop, máy: Laptop, tính: Laptop,
  tai: Headphones, nghe: Headphones, âm: Headphones,
  đồng: Watch, hồ: Watch, watch: Watch,
  camera: Camera, ảnh: Camera,
  thời: ShirtIcon, trang: ShirtIcon, áo: ShirtIcon,
  sách: BookOpen, book: BookOpen,
  game: Gamepad2, chơi: Gamepad2,
};

function getCatIcon(name: string) {
  const key = name.toLowerCase().split(' ').find(w => CAT_ICONS[w]);
  return key ? CAT_ICONS[key] : CAT_ICONS.default;
}

const CAT_GRADIENTS = [
  'from-blue-500 to-blue-600', 'from-violet-500 to-purple-600',
  'from-sky-500 to-cyan-600', 'from-indigo-500 to-blue-600',
  'from-rose-500 to-pink-600', 'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500', 'from-fuchsia-500 to-purple-600',
];

// ===== COUNTDOWN =====
function useCountdown(targetHours = 5, targetMinutes = 30, targetSeconds = 0) {
  const [time, setTime] = useState({
    h: targetHours, m: targetMinutes, s: targetSeconds,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(225,29,72,0.4)]">
        <span className="text-white font-black text-xl tabular-nums">{String(value).padStart(2, '0')}</span>
      </div>
      <span className="text-rose-600 text-[10px] font-bold mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

// ===== SIDE BANNERS =====
const SIDE_BANNERS = [
  {
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    badge: 'Phụ kiện',
    title: 'Đồng Hồ Cao Cấp',
    sub: 'Giảm đến 30%',
    link: '/search?q=đồng hồ',
  },
  {
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop',
    badge: 'Hot Deal',
    title: 'Mỹ Phẩm & Làm Đẹp',
    sub: 'Hàng chính hãng',
    link: '/search?q=mỹ phẩm',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const { h, m, s } = useCountdown(5, 30, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, setRes] = await Promise.all([
          apiClient.get('/products?limit=10'),
          apiClient.get('/categories'),
          apiClient.get('/settings'),
        ]);
        setProducts(prodRes.data.data || []);
        setCategories(catRes.data);
        setSettings(setRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-slide
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const t = setInterval(nextSlide, 4500);
    return () => clearInterval(t);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.4 } }),
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* ===== HERO: Slider to bên trái + 2 banner nhỏ bên phải ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[440px]">

          {/* Slider lớn — chiếm 2/3 */}
          <div className="lg:col-span-2 rounded-[28px] overflow-hidden relative shadow-blue bg-blue-900 h-[300px] lg:h-full">
            {/* Slide hình nền */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute right-0 bottom-0 h-full w-1/2 object-cover object-left opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                {/* Nội dung slide */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-lg">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-sm w-fit ${slide.badgeColor}`}>
                    {slide.badge}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ whiteSpace: 'pre-line' }}>
                    {slide.title}
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base mb-8 line-clamp-2">{slide.subtitle}</p>
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-2xl w-fit hover:bg-blue-50 hover:shadow-blue transition-all duration-300 text-sm"
                  >
                    {slide.cta} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nút prev/next */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/20">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/20">
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                  className={`rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>

          {/* 2 Banner nhỏ bên phải */}
          <div className="flex flex-row lg:flex-col gap-4 h-[200px] lg:h-full">
            {SIDE_BANNERS.map((banner, i) => (
              <Link
                key={i}
                to={banner.link}
                className="relative flex-1 rounded-[22px] overflow-hidden group shadow-card hover:shadow-hover transition-all duration-400"
              >
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full border border-white/20 mb-2">
                    {banner.badge}
                  </span>
                  <p className="text-white font-bold text-sm leading-tight">{banner.title}</p>
                  <p className="text-blue-200 text-xs mt-0.5">{banner.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== DANH MỤC NỔI BẬT ===== */}
        <section className="bg-white rounded-[28px] shadow-soft p-7 border border-blue-50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
              <h2 className="text-xl font-extrabold text-slate-900">Danh Mục Nổi Bật</h2>
            </div>
            <Link to="/search" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100" />
                  <div className="h-3 w-14 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {categories.slice(0, 8).map((cat: any, idx: number) => {
                const Icon = getCatIcon(cat.name);
                const grad = CAT_GRADIENTS[idx % CAT_GRADIENTS.length];
                return (
                  <Link key={cat.id} to={`/search?category=${cat.id}`} className="flex flex-col items-center gap-3 group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center group-hover:-translate-y-2 group-hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-all duration-400 shadow-soft`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs text-center text-slate-600 font-semibold group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ===== FLASH SALE ===== */}
        <section className="bg-white rounded-[28px] shadow-soft overflow-hidden border border-blue-50">
          {/* Header Flash Sale */}
          <div className="bg-gradient-to-r from-rose-600 to-rose-500 px-7 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="fill-white w-6 h-6 text-white" />
              <h2 className="text-xl font-black text-white tracking-tight">FLASH SALE</h2>
              <div className="flex items-center gap-1.5 ml-2">
                <CountdownBlock value={h} label="Giờ" />
                <span className="text-white font-black text-xl mb-3">:</span>
                <CountdownBlock value={m} label="Phút" />
                <span className="text-white font-black text-xl mb-3">:</span>
                <CountdownBlock value={s} label="Giây" />
              </div>
            </div>
            <Link to="/search" className="text-sm font-bold text-white/90 hover:text-white flex items-center gap-1">
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {[1,2,3,4,5].map(i => <SkeletonLoading key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {products.slice(0, 5).map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== GỢI Ý CHO BẠN ===== */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
              <h2 className="text-xl font-extrabold text-slate-900">Dành Riêng Cho Bạn</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {[...Array(10)].map((_, i) => <SkeletonLoading key={i} />)}
            </div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              >
                {products.map((product: any) => (
                  <motion.div
                    key={product.id}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-10 flex justify-center">
                <Link to="/search">
                  <button className="bg-white border-2 border-blue-200 text-blue-600 px-10 py-3.5 rounded-2xl font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-blue hover:-translate-y-1 transition-all duration-300">
                    Xem tất cả sản phẩm
                  </button>
                </Link>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
