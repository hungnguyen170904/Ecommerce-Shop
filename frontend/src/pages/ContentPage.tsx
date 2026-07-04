import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { staticContent } from '../data/staticContent';

export default function ContentPage({ slug }: { slug: string }) {
  const content = staticContent[slug] || {
    title: 'Không tìm thấy trang',
    content: '<p>Nội dung bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-indigo-600 px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white relative z-10 tracking-tight">
              {content.title}
            </h1>
          </div>
          
          {/* Content Body */}
          <div className="p-8 md:p-12 lg:p-16">
            <div 
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-600 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-slate-600 prose-ol:mb-6
                prose-li:mb-2
                prose-a:text-indigo-600 prose-a:font-medium hover:prose-a:text-indigo-800
                prose-strong:font-bold prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: content.content }} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
