import React from 'react';
import { cn } from '../../lib/utils';
import { User as UserIcon } from 'lucide-react';
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}
export function Avatar({
  src,
  alt,
  size = 'md',
  className,
  fallback
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  };
  return <div className={cn('relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-800 border border-gray-700', sizes[size], className)}>
      {src ? <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" /> : <span className="font-medium text-gray-400">
          {fallback ? fallback.slice(0, 2).toUpperCase() : <UserIcon className="h-1/2 w-1/2" />}
        </span>}
    </div>;
}