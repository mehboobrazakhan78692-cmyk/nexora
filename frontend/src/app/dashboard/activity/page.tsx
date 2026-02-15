'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/lib/api';
import { 
  Search, 
  Filter, 
  Download,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  Shield,
  Mail,
  FileText,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Activity {
  id: string;
  action: string;
  description: string;
  user: string;
  userEmail: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    action: 'LOGIN',
    description: 'User logged in successfully',
    user: 'John Doe',
    userEmail: 'john@example.com',
    ip: '192.168.1.1',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'success'
  },
  {
    id: '2',
    action: 'PASSWORD_CHANGE',
    description: 'Password changed successfully',
    user: 'Jane Smith',
    userEmail: 'jane@example.com',
    ip: '192.168.1.2',
    timestamp: '2024-01-15T09:45:00Z',
    status: 'success'
  },
  {
    id: '3',
    action: 'LOGIN_FAILED',
    description: 'Failed login attempt',
    user: 'Unknown',
    userEmail: 'unknown@example.com',
    ip: '192.168.1.100',
    timestamp: '2024-01-15T09:30:00Z',
    status: 'failed'
  },
  {
    id: '4',
    action: 'USER_CREATED',
    description: 'New user account created',
    user: 'Admin User',
    userEmail: 'admin@nexora.com',
    ip: '192.168.1.1',
    timestamp: '2024-01-15T08:00:00Z',
    status: 'success'
  },
  {
    id: '5',
    action: 'SETTINGS_UPDATE',
    description: 'Account settings updated',
    user: 'John Doe',
    userEmail: 'john@example.com',
    ip: '192.168.1.1',
    timestamp: '2024-01-14T16:30:00Z',
    status: 'success'
  },
  {
    id: '6',
    action: 'EMAIL_VERIFIED',
    description: 'Email address verified',
    user: 'Alice Johnson',
    userEmail: 'alice@example.com',
    ip: '192.168.1.5',
    timestamp: '2024-01-14T14:00:00Z',
    status: 'success'
  },
  {
    id: '7',
    action: 'LOGOUT',
    description: 'User logged out',
    user: 'Jane Smith',
    userEmail: 'jane@example.com',
    ip: '192.168.1.2',
    timestamp: '2024-01-14T12:00:00Z',
    status: 'success'
  },
  {
    id: '8',
    action: 'ROLE_CHANGE',
    description: 'User role changed to Admin',
    user: 'Super Admin',
    userEmail: 'superadmin@nexora.com',
    ip: '192.168.1.1',
    timestamp: '2024-01-14T10:00:00Z',
    status: 'success'
  }
];

const getActionIcon = (action: string) => {
  switch (action) {
    case 'LOGIN':
    case 'LOGIN_FAILED':
      return LogIn;
    case 'LOGOUT':
      return LogOut;
    case 'USER_CREATED':
      return UserPlus;
    case 'PASSWORD_CHANGE':
      return Shield;
    case 'SETTINGS_UPDATE':
      return Settings;
    case 'EMAIL_VERIFIED':
      return Mail;
    case 'ROLE_CHANGE':
      return Shield;
    default:
      return FileText;
  }
};

const getActionColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-600';
    case 'failed':
      return 'bg-red-100 text-red-600';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function ActivityPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
      // In real app, fetch activities from API
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && activity.status === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
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
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-500 mt-1">Monitor all platform activities and events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user, email or action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Events</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredActivities.map((activity) => {
                const Icon = getActionIcon(activity.action);
                return (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getActionColor(activity.status)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 font-mono">{activity.ip}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(activity.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        activity.status === 'success' ? 'bg-green-100 text-green-700' :
                        activity.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredActivities.length} of {activities.length} activities
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage >= 5}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
