import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Drawer } from '../components/ui/Drawer';
import { Badge } from '../components/ui/Badge';
import { MOCK_PROJECTS } from '../utils/mockData';
import { Project } from '../types';
import { Search, Filter, ExternalLink, Check, X, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function SubmissionsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    addToast
  } = useToast();
  const handleApprove = (type: 'DISCOVERY' | 'MARKETPLACE') => {
    addToast(`Project approved for ${type.toLowerCase()}`, 'success');
    setSelectedProject(null);
  };
  const handleReject = () => {
    addToast('Project rejected', 'error');
    setSelectedProject(null);
  };
  const columns = [{
    header: 'Project',
    cell: (project: Project) => <div>
          <div className="font-medium text-gray-200">{project.title}</div>
          <div className="text-xs text-gray-500">{project.category}</div>
        </div>
  }, {
    header: 'Submitted By',
    cell: (project: Project) => <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
            {project.submittedBy.name[0]}
          </div>
          <span className="text-sm">{project.submittedBy.name}</span>
        </div>
  }, {
    header: 'Platform',
    cell: (project: Project) => <Badge variant="outline">{project.platform}</Badge>
  }, {
    header: 'Status',
    cell: (project: Project) => <StatusBadge status={project.status} />
  }, {
    header: 'Date',
    accessorKey: 'submittedAt' as keyof Project,
    cell: (project: Project) => new Date(project.submittedAt).toLocaleDateString()
  }];
  const filteredProjects = MOCK_PROJECTS.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.submittedBy.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Submissions</h1>
          <p className="text-gray-400 mt-1">
            Review and manage project submissions.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search projects..." className="w-full sm:w-64" leftIcon={<Search className="w-4 h-4" />} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <Button variant="secondary" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Table data={filteredProjects} columns={columns} onRowClick={setSelectedProject} />

      <Drawer isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title="Submission Review" size="xl">
        {selectedProject && <div className="space-y-8">
            {/* Header Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-100">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline">{selectedProject.category}</Badge>
                  <Badge variant="outline">{selectedProject.platform}</Badge>
                  <StatusBadge status={selectedProject.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Submitted by</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <span className="font-medium text-gray-200">
                    {selectedProject.submittedBy.name}
                  </span>
                  {selectedProject.submittedBy.isVerified && <Check className="w-4 h-4 text-blue-400" />}
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Screenshots
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {selectedProject.screenshots.map((src, i) => <img key={i} src={src} alt={`Screenshot ${i + 1}`} className="rounded-xl border border-gray-800 w-full object-cover" />)}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Description
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {selectedProject.demoUrl && <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-4 h-4" /> View Demo
                </a>}
              {selectedProject.repoUrl && <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-4 h-4" /> View Code
                </a>}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row gap-4">
              <Button onClick={() => handleApprove('MARKETPLACE')} className="flex-1" leftIcon={<Check className="w-4 h-4" />}>
                Approve for Marketplace
              </Button>
              <Button onClick={() => handleApprove('DISCOVERY')} variant="secondary" className="flex-1" leftIcon={<Check className="w-4 h-4" />}>
                Approve Discovery Only
              </Button>
              <Button onClick={handleReject} variant="danger" className="flex-1" leftIcon={<X className="w-4 h-4" />}>
                Reject Submission
              </Button>
            </div>
          </div>}
      </Drawer>
    </div>;
}