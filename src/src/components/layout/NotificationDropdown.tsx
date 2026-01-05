import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notification } from '../../types';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}
export function NotificationDropdown({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;
  return <AnimatePresence>
      {isOpen && <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div initial={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} transition={{
        duration: 0.2
      }} className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="font-semibold text-gray-100">Notifications</h3>
              {unreadCount > 0 && <button onClick={onMarkAllAsRead} className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                  Mark all as read
                </button>}
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? <div className="p-8 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div> : <div className="divide-y divide-gray-800">
                  {notifications.slice(0, 5).map(notification => <div key={notification.id} className={cn('p-4 hover:bg-gray-800/50 transition-colors relative group', !notification.isRead && 'bg-blue-500/5')}>
                      <div className="flex gap-3">
                        <div className={cn('w-2 h-2 mt-2 rounded-full flex-shrink-0', notification.isRead ? 'bg-gray-700' : 'bg-blue-500')} />
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-sm font-medium truncate', notification.isRead ? 'text-gray-300' : 'text-gray-100')}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-gray-600 mt-2">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.isRead && <button onClick={e => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-blue-400" title="Mark as read">
                            <Check className="w-4 h-4" />
                          </button>}
                      </div>
                    </div>)}
                </div>}
            </div>

            <div className="p-3 border-t border-gray-800 bg-gray-900/50">
              <Link to="/notifications" onClick={onClose} className="block w-full text-center text-sm text-gray-400 hover:text-gray-100 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                View All Notifications
              </Link>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}