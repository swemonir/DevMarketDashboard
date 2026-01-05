import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}
export function Tabs({
  tabs,
  activeTab,
  onChange,
  className
}: TabsProps) {
  return <div className={cn('flex space-x-1 border-b border-gray-800', className)}>
      {tabs.map(tab => {
      const isActive = activeTab === tab.id;
      return <button key={tab.id} onClick={() => onChange(tab.id)} className={cn('relative px-4 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-t-lg', isActive ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50')}>
            <div className="flex items-center gap-2 relative z-10">
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
            </div>
            {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" initial={false} transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }} />}
          </button>;
    })}
    </div>;
}