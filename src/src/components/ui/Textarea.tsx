import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-400 mb-1.5">
            {label}
          </label>}
        <textarea ref={ref} className={cn('flex min-h-[80px] w-full rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500', className)} {...props} />
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
            {error}
          </p>}
      </div>;
});
Textarea.displayName = 'Textarea';