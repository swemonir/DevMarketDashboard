import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 border border-transparent',
    secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20 border border-transparent',
    ghost: 'bg-transparent text-gray-400 hover:text-gray-100 hover:bg-gray-800/50',
    outline: 'bg-transparent text-gray-300 border border-gray-700 hover:bg-gray-800 hover:text-white'
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10 p-2 flex items-center justify-center'
  };
  return <button className={cn('inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed', variants[variant], sizes[size], className)} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>;
}