import React from 'react';
import { Badge } from './Badge';
type StatusType = 'PENDING' | 'APPROVED_DISCOVERY' | 'APPROVED_MARKETPLACE' | 'REJECTED' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';
export function StatusBadge({
  status
}: {
  status: string;
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          variant: 'warning',
          label: 'Pending'
        };
      case 'APPROVED_DISCOVERY':
        return {
          variant: 'info',
          label: 'Discovery'
        };
      case 'APPROVED_MARKETPLACE':
        return {
          variant: 'success',
          label: 'Marketplace'
        };
      case 'REJECTED':
        return {
          variant: 'danger',
          label: 'Rejected'
        };
      case 'ACTIVE':
        return {
          variant: 'success',
          label: 'Active'
        };
      case 'SUSPENDED':
        return {
          variant: 'warning',
          label: 'Suspended'
        };
      case 'BANNED':
        return {
          variant: 'danger',
          label: 'Banned'
        };
      default:
        return {
          variant: 'default',
          label: status
        };
    }
  };
  const config = getStatusConfig(status);
  return <Badge variant={config.variant as any}>{config.label}</Badge>;
}