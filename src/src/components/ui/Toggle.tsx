import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  className,
  label,
  ...props
}, ref) => {
  return <label className="flex items-center cursor-pointer group">
        <div className="relative">
          <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
          <div className={cn('h-6 w-11 rounded-full bg-gray-800 border border-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500/30 transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600', className)}></div>
          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5"></div>
        </div>
        {label && <span className="ml-3 text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors select-none">
            {label}
          </span>}
      </label>;
});
Toggle.displayName = 'Toggle';