import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ShoppingBag, Users, Shield, Tags, BarChart3, Settings, Smartphone, FileClock, LogOut, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
export function Sidebar() {
  const {
    logout,
    hasRole
  } = useAuth();
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR']
  }, {
    name: 'Submissions',
    href: '/submissions',
    icon: FileText,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }, {
    name: 'Marketplace',
    href: '/marketplace',
    icon: ShoppingBag,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }, {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }, {
    name: 'Roles & Permissions',
    href: '/roles',
    icon: Shield,
    roles: ['SUPER_ADMIN']
  }, {
    name: 'Categories',
    href: '/categories',
    icon: Tags,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }, {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR']
  }, {
    name: 'App Control',
    href: '/app-control',
    icon: Smartphone,
    roles: ['SUPER_ADMIN']
  }, {
    name: 'Audit Logs',
    href: '/audit-logs',
    icon: FileClock,
    roles: ['SUPER_ADMIN']
  }, {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
    roles: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR']
  }, {
    name: 'Support',
    href: '/support',
    icon: MessageSquare,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }, {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN']
  }];
  const filteredNav = navigation.filter(item => item.roles.some(role => hasRole(role as any)));
  return <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-gray-100 font-bold text-lg tracking-tight">
            DevNexus
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredNav.map(item => {
        const isActive = location.pathname === item.href;
        return <NavLink key={item.name} to={item.href} className={({
          isActive
        }) => cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group', isActive ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800')}>
              <item.icon className={cn('w-5 h-5 transition-colors', isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300')} />
              {item.name}
            </NavLink>;
      })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>;
}