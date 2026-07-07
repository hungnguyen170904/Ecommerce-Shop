import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { staticContent } from '../data/staticContent';
import { motion } from 'framer-motion';

export default function ContentPage({ slug }: { slug: string }) {
  const content = staticContent[slug] || {
    title: 'Không tìm thấy trang',
    content: '<p>Nội dung bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const bannerImages: Record<string, string> = {
    'about': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
    'careers': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200',
    'shipping': 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1200',
    'returns': 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1200',
    'payment-guide': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200',
    'shopping-guide': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200',
    'help': 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=1200',
    'privacy': 'https://images.unsplash.com/photo-1510511459019-5efa3265ba48?q=80&w=1200',
    'terms': 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?q=80&w=1200',
  };

  const bgImage = bannerImages[slug] || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] shadow-soft border border-slate-100 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={bgImage} alt={content.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-[2px]"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white relative z-10 tracking-tight drop-shadow-lg px-4 text-center">
              {content.title}
            </h1>
          </div>
          
          {/* Content Body */}
          <div className="p-8 md:p-12 lg:p-16">
            <div 
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-indigo-900
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:list-none prose-ul:pl-0 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-slate-600 prose-ol:mb-6
                prose-li:mb-2
                prose-a:text-indigo-600 prose-a:font-bold hover:prose-a:text-indigo-800
                prose-strong:font-bold prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: content.content }} 
            />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
