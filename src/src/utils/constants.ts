import { Role, Permission } from '../types';
export const ROLES: Record<Role, {
  label: string;
  description: string;
  color: string;
}> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    description: 'Full access to all system features',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  ADMIN: {
    label: 'Admin',
    description: 'Can manage content and users',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  MODERATOR: {
    label: 'Moderator',
    description: 'Can review and flag content',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  }
};
export const PERMISSIONS: Record<Permission, string> = {
  MANAGE_USERS: 'Manage Users',
  VERIFY_USERS: 'Verify Users',
  MANAGE_PROJECTS: 'Manage Projects',
  APPROVE_DISCOVERY: 'Approve for Discovery',
  APPROVE_MARKETPLACE: 'Approve for Marketplace',
  REJECT_SUBMISSIONS: 'Reject Submissions',
  MANAGE_CATEGORIES: 'Manage Categories',
  VIEW_ANALYTICS: 'View Analytics',
  MANAGE_ADMIN_ROLES: 'Manage Admin Roles',
  ACCESS_SETTINGS: 'Access System Settings',
  VIEW_AUDIT_LOGS: 'View Audit Logs'
};
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: Object.keys(PERMISSIONS) as Permission[],
  ADMIN: ['MANAGE_USERS', 'VERIFY_USERS', 'MANAGE_PROJECTS', 'APPROVE_DISCOVERY', 'APPROVE_MARKETPLACE', 'REJECT_SUBMISSIONS', 'MANAGE_CATEGORIES', 'VIEW_ANALYTICS'],
  MODERATOR: ['MANAGE_PROJECTS', 'REJECT_SUBMISSIONS', 'VIEW_ANALYTICS' // Read-only usually implied by logic
  ]
};