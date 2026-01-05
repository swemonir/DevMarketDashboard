import React from 'react';
import { cn } from '../../lib/utils';
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden', className)} {...props}>
      {children}
    </div>;
}
export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 border-b border-gray-800', className)} {...props}>
      {children}
    </div>;
}
export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold text-gray-100', className)} {...props}>
      {children}
    </h3>;
}
export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props}>
      {children}
    </div>;
}