'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI, authAPI } from '@/lib/api';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield,
  Save,
  Camera,
  Loader2
} from 'lucide-react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    createdAt: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        createdAt: new Date().toISOString()
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await userAPI.updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl text-white font-bold">
                    {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-4">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-1" />
                {user.role?.replace('_', ' ')}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              {profile.phone && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {profile.phone}
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Joined {new Date(profile.createdAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Contact support to change your email</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
