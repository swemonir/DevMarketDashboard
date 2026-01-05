import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Users, FileText, ShoppingBag, TrendingUp, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
const data = [{
  name: 'Jan',
  users: 400,
  submissions: 240,
  sales: 2400
}, {
  name: 'Feb',
  users: 300,
  submissions: 139,
  sales: 2210
}, {
  name: 'Mar',
  users: 200,
  submissions: 980,
  sales: 2290
}, {
  name: 'Apr',
  users: 278,
  submissions: 390,
  sales: 2000
}, {
  name: 'May',
  users: 189,
  submissions: 480,
  sales: 2181
}, {
  name: 'Jun',
  users: 239,
  submissions: 380,
  sales: 2500
}];
const pieData = [{
  name: 'Web',
  value: 400
}, {
  name: 'App',
  value: 300
}];
const COLORS = ['#3b82f6', '#10b981'];
export function AnalyticsPage() {
  return <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Platform performance and growth metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Select options={[{
          value: '7d',
          label: 'Last 7 days'
        }, {
          value: '30d',
          label: 'Last 30 days'
        }, {
          value: '90d',
          label: 'Last 3 months'
        }]} className="w-40" />
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Daily Active Users" value="2,543" change={12} trend="up" icon={<Users className="w-5 h-5" />} />
        <MetricCard title="New Submissions" value="145" change={5} trend="up" icon={<FileText className="w-5 h-5" />} />
        <MetricCard title="Marketplace Requests" value="32" change={2} trend="down" icon={<ShoppingBag className="w-5 h-5" />} />
        <MetricCard title="Conversion Rate" value="3.2%" change={0.5} trend="up" icon={<TrendingUp className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }} />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }} />
                  <Area type="monotone" dataKey="sales" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submissions by Category</CardTitle>
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
                }} />
                  <Bar dataKey="submissions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
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
                  <span className="text-sm text-gray-400">{entry.name}</span>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}