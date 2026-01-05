export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR';
export type Permission = 'MANAGE_USERS' | 'VERIFY_USERS' | 'MANAGE_PROJECTS' | 'APPROVE_DISCOVERY' | 'APPROVE_MARKETPLACE' | 'REJECT_SUBMISSIONS' | 'MANAGE_CATEGORIES' | 'VIEW_ANALYTICS' | 'MANAGE_ADMIN_ROLES' | 'ACCESS_SETTINGS' | 'VIEW_AUDIT_LOGS';
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isVerified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  totalProjects: number;
  joinedAt: string;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  submittedBy: User;
  platform: 'WEB' | 'APP' | 'BOTH';
  category: string;
  tags: string[];
  status: 'PENDING' | 'APPROVED_DISCOVERY' | 'APPROVED_MARKETPLACE' | 'REJECTED';
  price?: number;
  isMarketplace: boolean;
  submittedAt: string;
  screenshots: string[];
  demoUrl?: string;
  repoUrl?: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'DISCOVERY' | 'MARKETPLACE' | 'BOTH';
  count: number;
  isEnabled: boolean;
  tags: Tag[];
}
export interface Tag {
  id: string;
  name: string;
  count: number;
}
export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  adminAvatar?: string;
  role: Role;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
}
export interface AnalyticsData {
  date: string;
  value: number;
  category?: string;
  platform?: string;
}
export interface MarketplaceListing {
  id: string;
  project: Project;
  seller: User;
  price: number;
  platform: 'WEB' | 'APP' | 'SOURCE';
  isVerified: boolean;
  isVisible: boolean;
  sales: number;
}
export interface Notification {
  id: string;
  type: 'NEW_SUBMISSION' | 'MARKETPLACE_REQUEST' | 'NEW_USER' | 'ROLE_ASSIGNED' | 'SYSTEM_ALERT';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
export interface ChatMessage {
  id: string;
  sender: 'USER' | 'ADMIN';
  text: string;
  timestamp: string;
}
export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  status: 'OPEN' | 'CLOSED';
  isPriority: boolean;
  timestamp: string;
  messages: ChatMessage[];
}