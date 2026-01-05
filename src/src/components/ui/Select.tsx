import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  options,
  error,
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-400 mb-1.5">
            {label}
          </label>}
        <div className="relative">
          <select ref={ref} className={cn('flex h-10 w-full appearance-none rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500', className)} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
            {error}
          </p>}
      </div>;
});
Select.displayName = 'Select';