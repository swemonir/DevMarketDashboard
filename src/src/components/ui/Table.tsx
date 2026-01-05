import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
}
export function Table<T extends {
  id: string | number;
}>({
  data,
  columns,
  onRowClick,
  className
}: TableProps<T>) {
  return <div className={cn('w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-950/50 text-gray-400 uppercase text-xs font-medium border-b border-gray-800">
            <tr>
              {columns.map((col, index) => <th key={index} className={cn('px-6 py-4', col.className)}>
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && <ChevronsUpDown className="w-3 h-3 text-gray-600" />}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.length === 0 ? <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  No data available
                </td>
              </tr> : data.map(item => <tr key={item.id} onClick={() => onRowClick?.(item)} className={cn('group transition-colors hover:bg-gray-800/50', onRowClick && 'cursor-pointer')}>
                  {columns.map((col, index) => <td key={index} className={cn('px-6 py-4 text-gray-300', col.className)}>
                      {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                    </td>)}
                </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}