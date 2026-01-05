import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Category } from '../../types';
import { useToast } from '../../contexts/ToastContext';
interface CategoryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}
export function CategoryEditorModal({
  isOpen,
  onClose,
  category
}: CategoryEditorModalProps) {
  const [name, setName] = useState(category?.name || '');
  const [type, setType] = useState(category?.type || 'BOTH');
  const [description, setDescription] = useState('');
  const {
    addToast
  } = useToast();
  const handleSave = () => {
    addToast(category ? 'Category updated successfully' : 'Category created successfully', 'success');
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={category ? 'Edit Category' : 'Create Category'}>
      <div className="space-y-4">
        <Input label="Category Name" placeholder="e.g. Templates" value={name} onChange={e => setName(e.target.value)} />

        <Select label="Type" value={type} onChange={e => setType(e.target.value as any)} options={[{
        value: 'DISCOVERY',
        label: 'Discovery Only'
      }, {
        value: 'MARKETPLACE',
        label: 'Marketplace Only'
      }, {
        value: 'BOTH',
        label: 'Both'
      }]} />

        <Input label="Icon Name (Lucide)" placeholder="e.g. Layout" />

        <Textarea label="Description" placeholder="Describe this category..." value={description} onChange={e => setDescription(e.target.value)} rows={3} />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {category ? 'Save Changes' : 'Create Category'}
          </Button>
        </div>
      </div>
    </Modal>;
}