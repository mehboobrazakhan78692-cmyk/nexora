'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Settings, 
  Bell, 
  Globe, 
  Palette, 
  Monitor,
  Moon,
  Sun,
  Save,
  Loader2
} from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    language: 'en',
    theme: 'light',
    timezone: 'UTC'
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setLoading(false);
    setTimeout(() => setSuccess(false), 3000);
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your preferences and notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <nav className="space-y-1">
              <a href="#notifications" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 text-primary-700 font-medium">
                <Bell className="w-5 h-5" />
                Notifications
              </a>
              <a href="#appearance" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
                <Palette className="w-5 h-5" />
                Appearance
              </a>
              <a href="#language" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
                <Globe className="w-5 h-5" />
                Language
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications */}
          <div id="notifications" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm">
                Settings saved successfully!
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
                <button
                  onClick={() => handleChange('pushNotifications', !settings.pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Digest</p>
                  <p className="text-sm text-gray-500">Receive a weekly summary of activity</p>
                </div>
                <button
                  onClick={() => handleChange('weeklyDigest', !settings.weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.weeklyDigest ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div id="appearance" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Appearance</h3>
            
            <div className="space-y-4">
              <p className="font-medium text-gray-900">Theme</p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleChange('theme', 'light')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    settings.theme === 'light' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Sun className="w-6 h-6 text-yellow-500" />
                  <span className="text-sm font-medium">Light</span>
                </button>
                <button
                  onClick={() => handleChange('theme', 'dark')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    settings.theme === 'dark' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Moon className="w-6 h-6 text-gray-700" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button
                  onClick={() => handleChange('theme', 'system')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    settings.theme === 'system' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Monitor className="w-6 h-6 text-gray-500" />
                  <span className="text-sm font-medium">System</span>
                </button>
              </div>
            </div>
          </div>

          {/* Language */}
          <div id="language" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Language & Region</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="en">English (US)</option>
                  <option value="en-uk">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                  <option value="IST">India (IST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
