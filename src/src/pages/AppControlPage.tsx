import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Modal } from '../components/ui/Modal';
import { Smartphone, Globe, AlertTriangle, Power } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function AppControlPage() {
  const {
    addToast
  } = useToast();
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const handleToggle = (feature: string) => {
    addToast(`${feature} status updated`, 'success');
  };
  return <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">App & Web Control</h1>
        <p className="text-gray-400 mt-1">
          Manage feature flags and platform availability.
        </p>
      </div>

      {/* Feature Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-200">Marketplace</p>
                <p className="text-sm text-gray-500">
                  Enable buying and selling
                </p>
              </div>
              <Toggle defaultChecked onChange={() => handleToggle('Marketplace')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-200">Submissions</p>
                <p className="text-sm text-gray-500">
                  Allow new project submissions
                </p>
              </div>
              <Toggle defaultChecked onChange={() => handleToggle('Submissions')} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-200">Guest Access</p>
                <p className="text-sm text-gray-500">
                  Allow browsing without login
                </p>
              </div>
              <Toggle defaultChecked onChange={() => handleToggle('Guest Access')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium text-gray-200">Web App</p>
                  <p className="text-sm text-gray-500">Show web projects</p>
                </div>
              </div>
              <Toggle defaultChecked onChange={() => handleToggle('Web App')} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium text-gray-200">Mobile App</p>
                  <p className="text-sm text-gray-500">Show mobile projects</p>
                </div>
              </div>
              <Toggle defaultChecked onChange={() => handleToggle('Mobile App')} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Mode */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Power className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-red-500">Maintenance Mode</CardTitle>
              <p className="text-sm text-red-400/70">
                Restrict access for system updates
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-300 max-w-xl">
              Activating maintenance mode will show a maintenance screen to all
              users. Admins will still have access.
            </p>
            <Button variant="danger" onClick={() => setIsMaintenanceModalOpen(true)}>
              Configure Maintenance
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isMaintenanceModalOpen} onClose={() => setIsMaintenanceModalOpen(false)} title="Maintenance Mode Configuration">
        <div className="space-y-6">
          <Textarea label="Maintenance Message" placeholder="We are currently performing scheduled maintenance..." rows={4} />

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-400">
              Apply to
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="platform" className="text-blue-500 bg-gray-900 border-gray-700" defaultChecked />
                <span className="text-gray-300">Both Platforms</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="platform" className="text-blue-500 bg-gray-900 border-gray-700" />
                <span className="text-gray-300">Web Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="platform" className="text-blue-500 bg-gray-900 border-gray-700" />
                <span className="text-gray-300">App Only</span>
              </label>
            </div>
          </div>

          <div className="bg-yellow-500/10 p-4 rounded-lg flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-500">
              This will immediately disconnect active users. Make sure you have
              announced this downtime.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsMaintenanceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
            addToast('Maintenance mode activated', 'success');
            setIsMaintenanceModalOpen(false);
          }}>
              Activate Maintenance Mode
            </Button>
          </div>
        </div>
      </Modal>
    </div>;
}