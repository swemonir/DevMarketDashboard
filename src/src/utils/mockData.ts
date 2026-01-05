import { User, Project, Category, AuditLog, MarketplaceListing, Notification, Chat } from '../types';
export const MOCK_USERS: User[] = [{
  id: 'u1',
  name: 'Alex Chen',
  email: 'alex@devnexus.com',
  role: 'SUPER_ADMIN',
  isVerified: true,
  status: 'ACTIVE',
  totalProjects: 12,
  joinedAt: '2023-01-15T10:00:00Z',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
}, {
  id: 'u2',
  name: 'Sarah Jones',
  email: 'sarah@devnexus.com',
  role: 'ADMIN',
  isVerified: true,
  status: 'ACTIVE',
  totalProjects: 5,
  joinedAt: '2023-03-10T14:30:00Z',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
}, {
  id: 'u3',
  name: 'Mike Ross',
  email: 'mike@devnexus.com',
  role: 'MODERATOR',
  isVerified: true,
  status: 'ACTIVE',
  totalProjects: 0,
  joinedAt: '2023-05-20T09:15:00Z',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
}, {
  id: 'u4',
  name: 'Jessica Pearson',
  email: 'jessica@pearson.com',
  role: 'ADMIN',
  isVerified: true,
  status: 'SUSPENDED',
  totalProjects: 8,
  joinedAt: '2023-02-01T11:00:00Z',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
}];
export const MOCK_PROJECTS: Project[] = [{
  id: 'p1',
  title: 'Nexus Dashboard Pro',
  description: 'A comprehensive dashboard template for SaaS applications with built-in analytics and user management.',
  submittedBy: MOCK_USERS[0],
  platform: 'WEB',
  category: 'Templates',
  tags: ['React', 'Tailwind', 'Dashboard'],
  status: 'APPROVED_MARKETPLACE',
  price: 49,
  isMarketplace: true,
  submittedAt: '2023-10-15T10:00:00Z',
  screenshots: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80']
}, {
  id: 'p2',
  title: 'Mobile E-commerce Kit',
  description: 'Complete UI kit for mobile e-commerce apps. Includes 50+ screens and components.',
  submittedBy: MOCK_USERS[1],
  platform: 'APP',
  category: 'UI Kits',
  tags: ['Mobile', 'E-commerce', 'Figma'],
  status: 'PENDING',
  isMarketplace: true,
  price: 29,
  submittedAt: '2023-11-01T15:30:00Z',
  screenshots: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80']
}, {
  id: 'p3',
  title: 'DevTools Extension',
  description: 'Browser extension for debugging React applications efficiently.',
  submittedBy: MOCK_USERS[2],
  platform: 'WEB',
  category: 'Developer Tools',
  tags: ['Extension', 'Debugging'],
  status: 'APPROVED_DISCOVERY',
  isMarketplace: false,
  submittedAt: '2023-11-05T09:20:00Z',
  screenshots: ['https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80']
}, {
  id: 'p4',
  title: 'Finance Tracker API',
  description: 'Robust API for tracking personal finances and investments.',
  submittedBy: MOCK_USERS[3],
  platform: 'WEB',
  category: 'Backend',
  tags: ['API', 'Finance', 'Node.js'],
  status: 'REJECTED',
  isMarketplace: false,
  submittedAt: '2023-11-02T14:15:00Z',
  screenshots: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80']
}];
export const MOCK_CATEGORIES: Category[] = [{
  id: 'c1',
  name: 'Templates',
  slug: 'templates',
  type: 'BOTH',
  count: 145,
  isEnabled: true,
  tags: [{
    id: 't1',
    name: 'React',
    count: 50
  }, {
    id: 't2',
    name: 'Vue',
    count: 30
  }]
}, {
  id: 'c2',
  name: 'UI Kits',
  slug: 'ui-kits',
  type: 'MARKETPLACE',
  count: 89,
  isEnabled: true,
  tags: [{
    id: 't3',
    name: 'Figma',
    count: 40
  }, {
    id: 't4',
    name: 'Sketch',
    count: 20
  }]
}, {
  id: 'c3',
  name: 'Developer Tools',
  slug: 'dev-tools',
  type: 'DISCOVERY',
  count: 230,
  isEnabled: true,
  tags: [{
    id: 't5',
    name: 'VS Code',
    count: 100
  }]
}, {
  id: 'c4',
  name: 'Backend',
  slug: 'backend',
  type: 'BOTH',
  count: 67,
  isEnabled: true,
  tags: [{
    id: 't6',
    name: 'Node.js',
    count: 30
  }, {
    id: 't7',
    name: 'Python',
    count: 25
  }]
}, {
  id: 'c5',
  name: 'Icons',
  slug: 'icons',
  type: 'MARKETPLACE',
  count: 312,
  isEnabled: false,
  tags: [{
    id: 't8',
    name: 'SVG',
    count: 200
  }]
}];
export const MOCK_AUDIT_LOGS: AuditLog[] = [{
  id: 'l1',
  adminId: 'u1',
  adminName: 'Alex Chen',
  adminAvatar: MOCK_USERS[0].avatar,
  role: 'SUPER_ADMIN',
  action: 'APPROVE_SUBMISSION',
  target: 'Nexus Dashboard Pro',
  details: 'Approved for Marketplace',
  timestamp: '2023-11-05T10:30:00Z',
  status: 'SUCCESS'
}, {
  id: 'l2',
  adminId: 'u2',
  adminName: 'Sarah Jones',
  adminAvatar: MOCK_USERS[1].avatar,
  role: 'ADMIN',
  action: 'SUSPEND_USER',
  target: 'Jessica Pearson',
  details: 'Violation of terms',
  timestamp: '2023-11-04T16:45:00Z',
  status: 'SUCCESS'
}, {
  id: 'l3',
  adminId: 'u1',
  adminName: 'Alex Chen',
  adminAvatar: MOCK_USERS[0].avatar,
  role: 'SUPER_ADMIN',
  action: 'UPDATE_SETTINGS',
  target: 'System Settings',
  details: 'Changed primary color',
  timestamp: '2023-11-03T09:15:00Z',
  status: 'SUCCESS'
}];
export const MOCK_MARKETPLACE_LISTINGS: MarketplaceListing[] = [{
  id: 'ml1',
  project: MOCK_PROJECTS[0],
  seller: MOCK_USERS[0],
  price: 49,
  platform: 'WEB',
  isVerified: true,
  isVisible: true,
  sales: 23
}, {
  id: 'ml2',
  project: MOCK_PROJECTS[1],
  seller: MOCK_USERS[1],
  price: 29,
  platform: 'APP',
  isVerified: false,
  isVisible: true,
  sales: 12
}];
export const MOCK_NOTIFICATIONS: Notification[] = [{
  id: 'n1',
  type: 'NEW_SUBMISSION',
  title: 'New Project Submitted',
  message: 'Dashboard Pro by Alex Chen',
  timestamp: '2024-01-15T10:30:00Z',
  isRead: false
}, {
  id: 'n2',
  type: 'MARKETPLACE_REQUEST',
  title: 'Marketplace Verification',
  message: 'Sarah Jones requested seller verification',
  timestamp: '2024-01-14T15:45:00Z',
  isRead: false
}, {
  id: 'n3',
  type: 'SYSTEM_ALERT',
  title: 'System Maintenance',
  message: 'Scheduled maintenance in 2 hours',
  timestamp: '2024-01-14T09:00:00Z',
  isRead: true
}];
export const MOCK_CHATS: Chat[] = [{
  id: 'c1',
  user: MOCK_USERS[1],
  lastMessage: 'How do I verify my account?',
  unreadCount: 2,
  status: 'OPEN',
  isPriority: true,
  timestamp: '2024-01-15T14:30:00Z',
  messages: [{
    id: 'm1',
    sender: 'USER',
    text: 'Hi, I need help.',
    timestamp: '2024-01-15T14:25:00Z'
  }, {
    id: 'm2',
    sender: 'USER',
    text: 'How do I verify my account?',
    timestamp: '2024-01-15T14:30:00Z'
  }]
}, {
  id: 'c2',
  user: MOCK_USERS[3],
  lastMessage: 'Thanks for your help!',
  unreadCount: 0,
  status: 'CLOSED',
  isPriority: false,
  timestamp: '2024-01-13T11:20:00Z',
  messages: [{
    id: 'm1',
    sender: 'USER',
    text: 'My listing is not showing up.',
    timestamp: '2024-01-13T10:00:00Z'
  }, {
    id: 'm2',
    sender: 'ADMIN',
    text: 'I checked and it was pending approval. I have approved it now.',
    timestamp: '2024-01-13T10:15:00Z'
  }, {
    id: 'm3',
    sender: 'USER',
    text: 'Thanks for your help!',
    timestamp: '2024-01-13T11:20:00Z'
  }]
}];