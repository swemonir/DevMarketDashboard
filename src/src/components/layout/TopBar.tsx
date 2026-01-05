import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Input } from '../ui/Input';
import { NotificationDropdown } from './NotificationDropdown';
import { MOCK_NOTIFICATIONS } from '../../utils/mockData';
import { useToast } from '../../contexts/ToastContext';
export function TopBar() {
  const {
    user
  } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const {
    addToast
  } = useToast();
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      isRead: true
    } : n));
  };
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      isRead: true
    })));
    addToast('All notifications marked as read', 'success');
  };
  return <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-gray-400 hover:text-gray-100">
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:block w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search anything..." className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
          </div>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-gray-900" />}
          </button>

          <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllAsRead={handleMarkAllAsRead} />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role.replace('_', ' ').toLowerCase()}
            </p>
          </div>
          <Avatar src={user?.avatar} fallback={user?.name} />
        </div>
      </div>
    </header>;
}