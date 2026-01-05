import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { MOCK_NOTIFICATIONS } from '../utils/mockData';
import { Bell, Check, Trash2, Filter } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { cn } from '../lib/utils';
export function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const {
    addToast
  } = useToast();
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      isRead: true
    } : n));
  };
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    addToast('Notification deleted', 'success');
  };
  const handleClearAll = () => {
    setNotifications([]);
    addToast('All notifications cleared', 'success');
  };
  const filteredNotifications = filter === 'ALL' ? notifications : notifications.filter(n => !n.isRead);
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Notifications</h1>
          <p className="text-gray-400 mt-1">
            Stay updated with system alerts and activities.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setFilter(filter === 'ALL' ? 'UNREAD' : 'ALL')}>
            {filter === 'ALL' ? 'Show Unread Only' : 'Show All'}
          </Button>
          <Button variant="danger" onClick={handleClearAll} leftIcon={<Trash2 className="w-4 h-4" />}>
            Clear All
          </Button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? <EmptyState icon={Bell} title="No notifications" description="You're all caught up! Check back later for new alerts." /> : <div className="space-y-4 max-w-3xl">
          {filteredNotifications.map(notification => <Card key={notification.id} className={cn('transition-all hover:border-gray-700', !notification.isRead && 'bg-blue-500/5 border-blue-500/20')}>
              <div className="p-4 flex gap-4">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', notification.isRead ? 'bg-gray-800 text-gray-400' : 'bg-blue-500 text-white')}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={cn('font-medium', notification.isRead ? 'text-gray-300' : 'text-gray-100')}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {!notification.isRead && <Button size="sm" variant="ghost" onClick={() => handleMarkAsRead(notification.id)} leftIcon={<Check className="w-3 h-3" />}>
                        Mark as Read
                      </Button>}
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(notification.id)} leftIcon={<Trash2 className="w-3 h-3" />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>)}
        </div>}
    </div>;
}