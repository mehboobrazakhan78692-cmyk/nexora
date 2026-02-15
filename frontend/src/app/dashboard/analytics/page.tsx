'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const mockUserGrowth = [
  { month: 'Jan', users: 400, newUsers: 240 },
  { month: 'Feb', users: 550, newUsers: 150 },
  { month: 'Mar', users: 780, newUsers: 230 },
  { month: 'Apr', users: 920, newUsers: 140 },
  { month: 'May', users: 1200, newUsers: 280 },
  { month: 'Jun', users: 1450, newUsers: 250 },
];

const mockActivityData = [
  { hour: '00:00', active: 45 },
  { hour: '04:00', active: 32 },
  { hour: '08:00', active: 180 },
  { hour: '12:00', active: 320 },
  { hour: '16:00', active: 280 },
  { hour: '20:00', active: 150 },
  { hour: '24:00', active: 65 },
];

const mockDeviceData = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 10 },
];

const mockLocationData = [
  { country: 'United States', users: 4500, percentage: 35 },
  { country: 'India', users: 2800, percentage: 22 },
  { country: 'Germany', users: 1500, percentage: 12 },
  { country: 'United Kingdom', users: 1200, percentage: 9 },
  { country: 'Others', users: 2800, percentage: 22 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
      setIsAdmin(true);
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">You don&apos;t have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Detailed insights into your platform&apos;s performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Last 30 days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12,450</p>
          <p className="text-sm text-green-600 mt-2">↑ 15.3% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">8,920</p>
          <p className="text-sm text-green-600 mt-2">↑ 8.7% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg. Session</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4m 32s</p>
          <p className="text-sm text-red-600 mt-2">↓ 2.1% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Bounce Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">32.5%</p>
          <p className="text-sm text-green-600 mt-2">↓ 5.2% from last month</p>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockUserGrowth}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                name="Total Users"
              />
              <Area 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNew)" 
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity by Hour */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity by Hour</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="active" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Distribution</h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDeviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {mockDeviceData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Countries</h3>
        <div className="space-y-4">
          {mockLocationData.map((location, index) => (
            <div key={location.country} className="flex items-center gap-4">
              <span className="text-sm text-gray-500 w-6">{index + 1}</span>
              <span className="text-sm font-medium text-gray-900 flex-1">{location.country}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full" 
                  style={{ width: `${location.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-20 text-right">{location.users.toLocaleString()}</span>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">{location.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
