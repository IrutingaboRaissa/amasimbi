import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Mail,
  Calendar,
  Book,
  Settings,
  Shield,
  Bell,
  LogOut,
  Save,
  CheckCircle
} from 'lucide-react';

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    age: user?.age || '',
    category: user?.category || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await updateProfile(formData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError('Failed to log out. Please try again.');
    }
  };

  const stats = [
    {
      icon: <Book className="w-5 h-5" />,
      label: "Courses Completed",
      value: "5"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Days Active",
      value: "45"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Achievement Points",
      value: "320"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">
              {user?.displayName || 'Your Profile'}
            </h1>
            <p className="text-lg text-purple-700">
              Manage your account settings and view your progress
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-purple-50 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-1">{stat.value}</h3>
                <p className="text-purple-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-purple-900">Profile Settings</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-900 p-4 rounded-lg flex items-center gap-2 mb-6"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p>Profile updated successfully!</p>
                </motion.div>
              )}

              {error && (
                <div className="bg-red-50 text-red-900 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-purple-900 mb-2">
                    Display Name
                  </label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-900 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-purple-900 mb-2">
                      Age
                    </label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-purple-900 mb-2">
                      Category
                    </label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Additional Settings */}
            <div className="mt-8 space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Notifications</h3>
                      <p className="text-sm text-purple-700">Manage your notification preferences</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Account Settings</h3>
                      <p className="text-sm text-purple-700">Manage your account preferences</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 