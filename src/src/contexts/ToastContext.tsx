import React, { useCallback, useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export function ToastProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, {
      id,
      message,
      type
    }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };
  return <ToastContext.Provider value={{
    addToast
  }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => <motion.div key={toast.id} initial={{
          opacity: 0,
          y: 20,
          scale: 0.9
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9,
          transition: {
            duration: 0.2
          }
        }} className={`
                flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[300px]
                ${toast.type === 'success' ? 'bg-gray-900 border-emerald-500/30 text-emerald-400' : ''}
                ${toast.type === 'error' ? 'bg-gray-900 border-red-500/30 text-red-400' : ''}
                ${toast.type === 'info' ? 'bg-gray-900 border-blue-500/30 text-blue-400' : ''}
              `}>
              {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5" />}
              <span className="text-sm font-medium text-gray-200 flex-1">
                {toast.message}
              </span>
              <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>;
}
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}