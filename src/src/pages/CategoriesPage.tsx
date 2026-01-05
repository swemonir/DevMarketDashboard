import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Toggle } from '../components/ui/Toggle';
import { CategoryEditorModal } from '../components/modals/CategoryEditorModal';
import { ConfirmationModal } from '../components/modals/ConfirmationModal';
import { MOCK_CATEGORIES } from '../utils/mockData';
import { Category } from '../types';
import { Plus, Edit2, Trash2, Tags } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function CategoriesPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const {
    addToast
  } = useToast();
  const handleDelete = () => {
    addToast('Category deleted successfully', 'success');
    setDeleteId(null);
  };
  const handleToggle = (id: string) => {
    addToast('Category status updated', 'success');
  };
  const columns = [{
    header: 'Name',
    cell: (cat: Category) => <div className="font-medium text-gray-200">{cat.name}</div>
  }, {
    header: 'Type',
    cell: (cat: Category) => <Badge variant={cat.type === 'BOTH' ? 'info' : 'default'}>
          {cat.type}
        </Badge>
  }, {
    header: 'Projects',
    accessorKey: 'count' as keyof Category
  }, {
    header: 'Tags',
    cell: (cat: Category) => <div className="flex gap-1 flex-wrap">
          {cat.tags.slice(0, 3).map(tag => <span key={tag.id} className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">
              {tag.name}
            </span>)}
          {cat.tags.length > 3 && <span className="text-xs text-gray-500">
              +{cat.tags.length - 3}
            </span>}
        </div>
  }, {
    header: 'Status',
    cell: (cat: Category) => <Toggle checked={cat.isEnabled} onChange={() => handleToggle(cat.id)} />
  }, {
    header: 'Actions',
    cell: (cat: Category) => <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => {
        setEditingCategory(cat);
        setIsEditorOpen(true);
      }}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => setDeleteId(cat.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
  }];
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Categories & Tags
          </h1>
          <p className="text-gray-400 mt-1">
            Manage project categories and taxonomy.
          </p>
        </div>
        <Button onClick={() => {
        setEditingCategory(null);
        setIsEditorOpen(true);
      }} leftIcon={<Plus className="w-4 h-4" />}>
          Create Category
        </Button>
      </div>

      <Table data={MOCK_CATEGORIES} columns={columns} />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Tags className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">
              Tag Management
            </h3>
            <p className="text-sm text-gray-400">
              Merge duplicates and manage spam tags
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary">Merge Duplicate Tags</Button>
          <Button variant="secondary">Review New Tags</Button>
          <Button variant="secondary">Manage Blocked Tags</Button>
        </div>
      </div>

      <CategoryEditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} category={editingCategory} />

      <ConfirmationModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Category" description="Are you sure you want to delete this category? This action cannot be undone and may affect existing projects." />
    </div>;
}