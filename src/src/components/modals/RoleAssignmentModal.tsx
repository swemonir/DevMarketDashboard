import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { User, Role } from '../../types';
import { Avatar } from '../ui/Avatar';
import { useToast } from '../../contexts/ToastContext';
interface RoleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}
export function RoleAssignmentModal({
  isOpen,
  onClose,
  user
}: RoleAssignmentModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(user?.role || 'ADMIN');
  const {
    addToast
  } = useToast();
  if (!user) return null;
  const handleAssign = () => {
    addToast(`Role updated to ${selectedRole} for ${user.name}`, 'success');
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Assign Role">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-800">
          <Avatar src={user.avatar} fallback={user.name} size="lg" />
          <div>
            <h3 className="font-medium text-gray-100">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <Select label="Select Role" value={selectedRole} onChange={e => setSelectedRole(e.target.value as Role)} options={[{
        value: 'SUPER_ADMIN',
        label: 'Super Admin'
      }, {
        value: 'ADMIN',
        label: 'Admin'
      }, {
        value: 'MODERATOR',
        label: 'Moderator'
      }]} />

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-400">
          <p>
            <strong>Note:</strong> Changing a user's role will immediately
            update their permissions and access levels across the dashboard.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign}>Confirm Assignment</Button>
        </div>
      </div>
    </Modal>;
}