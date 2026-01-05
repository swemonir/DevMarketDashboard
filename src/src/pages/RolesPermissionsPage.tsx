import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Badge } from '../components/ui/Badge';
import { RoleAssignmentModal } from '../components/modals/RoleAssignmentModal';
import { MOCK_USERS } from '../utils/mockData';
import { Shield, Plus, Users } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { Role, Permission } from '../types';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../utils/constants';
export function RolesPermissionsPage() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const {
    addToast
  } = useToast();
  const handlePermissionChange = (role: Role, permission: Permission) => {
    addToast('Permission updated successfully', 'success');
  };
  return <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Roles & Permissions
          </h1>
          <p className="text-gray-400 mt-1">
            Configure access levels and manage role assignments.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIsAssignModalOpen(true)} leftIcon={<Users className="w-4 h-4" />}>
            Assign Role
          </Button>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Create New Role
          </Button>
        </div>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].map(role => <Card key={role} className="border-t-4 border-t-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {role.replace('_', ' ')}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {role === 'SUPER_ADMIN' ? 'Full system access' : role === 'ADMIN' ? 'Manage content & users' : 'Content moderation only'}
                  </p>
                </div>
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>
                  {MOCK_USERS.filter(u => u.role === role).length} users
                  assigned
                </span>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 font-medium text-gray-400">
                    Permission
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-100 text-center">
                    Super Admin
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-100 text-center">
                    Admin
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-100 text-center">
                    Moderator
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {Object.entries(PERMISSIONS).map(([key, label]) => <tr key={key} className="hover:bg-gray-800/30">
                    <td className="py-4 px-6 text-gray-300">{label}</td>
                    {(['SUPER_ADMIN', 'ADMIN', 'MODERATOR'] as Role[]).map(role => <td key={role} className="py-4 px-6 text-center">
                          <div className="flex justify-center">
                            <Checkbox checked={ROLE_PERMISSIONS[role].includes(key as Permission)} onChange={() => handlePermissionChange(role, key as Permission)} disabled={role === 'SUPER_ADMIN'} // Super Admin always has all permissions
                    />
                          </div>
                        </td>)}
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <RoleAssignmentModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} user={MOCK_USERS[1]} // Mock user for demo
    />
    </div>;
}