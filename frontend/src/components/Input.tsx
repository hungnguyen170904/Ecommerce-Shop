import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-xl border bg-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
            transition-all duration-200 placeholder:text-slate-400 text-slate-800
            ${error ? 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300'}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-rose-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
