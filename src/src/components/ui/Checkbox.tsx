import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  label,
  ...props
}, ref) => {
  return <label className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
          <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
          <div className={cn('h-5 w-5 rounded border border-gray-700 bg-gray-900 transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500/30 group-hover:border-gray-600', className)}></div>
          <Check className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
        </div>
        {label && <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors select-none">
            {label}
          </span>}
      </label>;
});
Checkbox.displayName = 'Checkbox';