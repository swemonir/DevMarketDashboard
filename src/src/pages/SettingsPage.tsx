import React, { useState } from 'react';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Toggle } from '../components/ui/Toggle';
import { Select } from '../components/ui/Select';
import { Settings, Shield, Globe, Scale } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const {
    addToast
  } = useToast();
  const handleSave = () => {
    addToast('Settings saved successfully', 'success');
  };
  const tabs = [{
    id: 'general',
    label: 'General',
    icon: <Settings />
  }, {
    id: 'marketplace',
    label: 'Marketplace',
    icon: <Globe />
  }, {
    id: 'legal',
    label: 'Legal',
    icon: <Scale />
  }, {
    id: 'security',
    label: 'Security',
    icon: <Shield />
  }];
  return <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">System Settings</h1>
        <p className="text-gray-400 mt-1">
          Configure global application settings.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="max-w-2xl">
        {activeTab === 'general' && <Card>
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="App Name" defaultValue="DevNexus" />
              <Input label="Support Email" defaultValue="support@devnexus.com" />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Brand Color
                </label>
                <div className="flex items-center gap-3">
                  <input type="color" className="h-10 w-20 rounded bg-transparent border border-gray-700" defaultValue="#3b82f6" />
                  <span className="text-gray-400">#3B82F6</span>
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>}

        {activeTab === 'marketplace' && <Card>
            <CardHeader>
              <CardTitle>Marketplace Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select label="Default Currency" options={[{
            value: 'USD',
            label: 'USD ($)'
          }, {
            value: 'EUR',
            label: 'EUR (€)'
          }]} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Min Price ($)" type="number" defaultValue="5" />
                <Input label="Max Price ($)" type="number" defaultValue="999" />
              </div>
              <Input label="Platform Commission (%)" type="number" defaultValue="10" />
              <div className="pt-4">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>}

        {activeTab === 'legal' && <Card>
            <CardHeader>
              <CardTitle>Legal Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="Terms of Service URL" defaultValue="https://devnexus.com/terms" />
              <Input label="Privacy Policy URL" defaultValue="https://devnexus.com/privacy" />
              <Input label="DMCA Policy URL" defaultValue="https://devnexus.com/dmca" />
              <div className="pt-4">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>}

        {activeTab === 'security' && <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-200">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500">
                    Enforce 2FA for all admins
                  </p>
                </div>
                <Toggle />
              </div>
              <Input label="Session Timeout (minutes)" type="number" defaultValue="60" />
              <Input label="Max Login Attempts" type="number" defaultValue="5" />
              <div className="pt-4">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>}
      </div>
    </div>;
}