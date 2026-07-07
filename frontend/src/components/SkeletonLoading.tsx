import { motion } from 'framer-motion';

export const SkeletonLoading = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 w-full"
    >
      <div className="w-full aspect-[4/5] bg-slate-200 rounded-xl animate-pulse mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-slate-200 rounded w-1/3 animate-pulse"></div>
        <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    </motion.div>
  );
};
