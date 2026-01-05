import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, FileText, ShoppingBag, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
const data = [{
  name: 'Mon',
  submissions: 4,
  approved: 3
}, {
  name: 'Tue',
  submissions: 7,
  approved: 5
}, {
  name: 'Wed',
  submissions: 5,
  approved: 4
}, {
  name: 'Thu',
  submissions: 12,
  approved: 8
}, {
  name: 'Fri',
  submissions: 9,
  approved: 7
}, {
  name: 'Sat',
  submissions: 3,
  approved: 2
}, {
  name: 'Sun',
  submissions: 2,
  approved: 1
}];
const pieData = [{
  name: 'Web Apps',
  value: 400
}, {
  name: 'Mobile Apps',
  value: 300
}, {
  name: 'UI Kits',
  value: 300
}, {
  name: 'APIs',
  value: 200
}];
const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
export function DashboardPage() {
  return <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">
          Welcome back to DevNexus Control Center.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Users" value="12,345" change={12} trend="up" icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Pending Submissions" value="24" change={5} trend="up" icon={<FileText className="w-5 h-5" />} />
        <MetricCard title="Marketplace Listings" value="1,203" change={8} trend="up" icon={<ShoppingBag className="w-5 h-5" />} />
        <MetricCard title="Total Revenue" value="$45,230" change={2} trend="down" icon={<DollarSign className="w-5 h-5" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }} itemStyle={{
                  color: '#f3f4f6'
                }} />
                  <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }} itemStyle={{
                  color: '#f3f4f6'
                }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry, index) => <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{
                backgroundColor: COLORS[index % COLORS.length]
              }} />
                  <span className="text-xs text-gray-400">{entry.name}</span>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="flex items-start gap-4">
                <div className="p-2 bg-gray-800 rounded-full mt-1">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-200">
                    <span className="font-medium text-white">Alex Chen</span>{' '}
                    approved{' '}
                    <span className="font-medium text-white">
                      Nexus Dashboard
                    </span>{' '}
                    for Marketplace
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}