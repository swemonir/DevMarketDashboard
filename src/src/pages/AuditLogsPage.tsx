import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { MOCK_AUDIT_LOGS } from '../utils/mockData';
import { AuditLog } from '../types';
import { Search, Filter, Download } from 'lucide-react';
export function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const columns = [{
    header: 'Admin',
    cell: (log: AuditLog) => <div className="flex items-center gap-3">
          <Avatar src={log.adminAvatar} size="sm" fallback={log.adminName} />
          <div>
            <div className="font-medium text-gray-200">{log.adminName}</div>
            <div className="text-xs text-gray-500">{log.role}</div>
          </div>
        </div>
  }, {
    header: 'Action',
    cell: (log: AuditLog) => <Badge variant="outline">{log.action.replace('_', ' ')}</Badge>
  }, {
    header: 'Target',
    accessorKey: 'target' as keyof AuditLog
  }, {
    header: 'Details',
    accessorKey: 'details' as keyof AuditLog,
    className: 'text-gray-400'
  }, {
    header: 'Timestamp',
    cell: (log: AuditLog) => new Date(log.timestamp).toLocaleString()
  }, {
    header: 'Status',
    cell: (log: AuditLog) => <Badge variant={log.status === 'SUCCESS' ? 'success' : 'danger'}>
          {log.status}
        </Badge>
  }];
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Audit Logs</h1>
          <p className="text-gray-400 mt-1">
            Track system changes and admin actions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
        <Input placeholder="Search logs..." className="max-w-xs" leftIcon={<Search className="w-4 h-4" />} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <Select options={[{
        value: 'ALL',
        label: 'All Actions'
      }, {
        value: 'CREATE',
        label: 'Create'
      }, {
        value: 'UPDATE',
        label: 'Update'
      }, {
        value: 'DELETE',
        label: 'Delete'
      }]} className="max-w-xs" />
        <Button variant="secondary" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <Table data={MOCK_AUDIT_LOGS} columns={columns} />
    </div>;
}