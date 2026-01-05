import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}
export function MetricCard({
  title,
  value,
  change,
  icon,
  trend,
  className
}: MetricCardProps) {
  return <Card className={cn('hover:border-gray-700 transition-colors', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-gray-800 rounded-lg text-gray-400">{icon}</div>
          {change !== undefined && <div className={cn('flex items-center text-xs font-medium px-2 py-1 rounded-full', trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : trend === 'down' ? 'text-red-400 bg-red-500/10' : 'text-gray-400 bg-gray-800')}>
              {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3 mr-1" /> : null}
              {Math.abs(change)}%
            </div>}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-100 mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>;
}