import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { MOCK_USERS } from '../utils/mockData';
import { User, Role } from '../types';
import { Search, MoreVertical, Shield, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    addToast
  } = useToast();
  const handleAction = (action: string) => {
    addToast(`User ${action} successfully`, 'success');
    setSelectedUser(null);
  };
  const columns = [{
    header: 'User',
    cell: (user: User) => <div className="flex items-center gap-3">
          <Avatar src={user.avatar} fallback={user.name} />
          <div>
            <div className="font-medium text-gray-200">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
  }, {
    header: 'Role',
    cell: (user: User) => <Badge variant={user.role === 'SUPER_ADMIN' ? 'info' : 'default'}>
          {user.role.replace('_', ' ')}
        </Badge>
  }, {
    header: 'Status',
    cell: (user: User) => <StatusBadge status={user.status} />
  }, {
    header: 'Projects',
    accessorKey: 'totalProjects' as keyof User,
    className: 'text-center'
  }, {
    header: 'Actions',
    cell: (user: User) => <Button variant="ghost" size="sm" onClick={e => {
      e.stopPropagation();
      setSelectedUser(user);
    }}>
          Manage
        </Button>
  }];
  const filteredUsers = MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">User Management</h1>
          <p className="text-gray-400 mt-1">
            Manage users, roles, and permissions.
          </p>
        </div>
        <Input placeholder="Search users..." className="w-64" leftIcon={<Search className="w-4 h-4" />} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <Table data={filteredUsers} columns={columns} />

      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title="Manage User">
        {selectedUser && <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
              <Avatar src={selectedUser.avatar} size="lg" fallback={selectedUser.name} />
              <div>
                <h3 className="text-lg font-bold text-gray-100">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-400">{selectedUser.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 uppercase">
                Actions
              </h4>

              <div className="grid grid-cols-1 gap-3">
                <Button variant="secondary" className="justify-start" leftIcon={<Shield className="w-4 h-4" />} onClick={() => handleAction('role updated')}>
                  Change Role
                </Button>

                {selectedUser.status === 'ACTIVE' ? <Button variant="danger" className="justify-start" leftIcon={<Ban className="w-4 h-4" />} onClick={() => handleAction('suspended')}>
                    Suspend User
                  </Button> : <Button variant="primary" className="justify-start" leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => handleAction('activated')}>
                    Activate User
                  </Button>}
              </div>
            </div>
          </div>}
      </Modal>
    </div>;
}