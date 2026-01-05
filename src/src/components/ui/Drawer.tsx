import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md'
}: DrawerProps) {
  if (typeof document === 'undefined') return null;
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
  };
  return createPortal(<AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }} className={cn('fixed inset-y-0 right-0 z-50 w-full bg-gray-950 border-l border-gray-800 shadow-2xl flex flex-col', sizes[size], className)}>
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
              <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </>}
    </AnimatePresence>, document.body);
}