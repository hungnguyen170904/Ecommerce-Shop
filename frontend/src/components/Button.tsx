import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', fullWidth, className = '', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const variants = {
      primary: "bg-brand-cta text-white hover:bg-brand-cta-hover focus:ring-brand-cta shadow-soft",
      outline: "border-2 border-slate-200 text-slate-700 hover:border-brand-cta hover:text-brand-cta hover:bg-white focus:ring-brand-cta",
      ghost: "text-slate-600 hover:text-brand-cta hover:bg-brand-bg focus:ring-brand-cta",
    };

    const sizeStyles = "px-5 py-2.5 text-sm";
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
