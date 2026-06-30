import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function StaticPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-soft border border-slate-100">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-600 mb-8">
            Nội dung trang này đang trong quá trình xây dựng và sẽ sớm được ra mắt. Cảm ơn sự quan tâm của bạn!
          </p>
          <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Quay lại trang chủ
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
