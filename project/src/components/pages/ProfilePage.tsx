import { useState, useEffect, useRef } from 'react';
import { User, Bell, Settings, BookOpen, Award, Heart, Calendar, Edit, Camera, LogOut, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserUpdateData } from '@/types/user';
import api from '@/services/api';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<UserUpdateData>({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData(prev => ({ ...prev, avatar: response.data.avatarUrl }));
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Failed to upload avatar');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUser(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    { title: "Quick Learner", description: "Completed 5 courses in first month", icon: BookOpen },
    { title: "Active Participant", description: "Posted 20+ times in community", icon: Heart },
    { title: "Wellness Champion", description: "Completed all health modules", icon: Award }
  ];

  const upcomingEvents = [
    { title: "Women's Health Workshop", date: "March 15, 2024", time: "2:00 PM" },
    { title: "Mindfulness Session", date: "March 18, 2024", time: "10:00 AM" },
    { title: "Community Meetup", date: "March 20, 2024", time: "3:30 PM" }
  ];

  const courses = [
    {
      title: "Understanding Puberty",
      progress: 60,
      totalModules: 10,
      completedModules: 6,
      lastAccessed: "2 days ago"
    },
    {
      title: "Menstrual Health",
      progress: 30,
      totalModules: 8,
      completedModules: 3,
      lastAccessed: "1 week ago"
    },
    {
      title: "Mental Wellness",
      progress: 80,
      totalModules: 12,
      completedModules: 10,
      lastAccessed: "Yesterday"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900">My Profile</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={formData.avatar || '/default-avatar.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      displayName: user?.displayName || '',
                      email: user?.email || '',
                      phoneNumber: user?.phoneNumber || '',
                      address: user?.address || '',
                      bio: user?.bio || '',
                      avatar: user?.avatar || ''
                    });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>

      <main className="container mx-auto py-12 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">3 Courses</h3>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">5 Achievements</h3>
                    <p className="text-sm text-gray-600">Unlocked</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">20+ Posts</h3>
                    <p className="text-sm text-gray-600">In Community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 p-3 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Events</Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Learning Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">Learning Progress</h2>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div key={index} className="bg-purple-50/50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-purple-900">{course.title}</h3>
                        <p className="text-sm text-purple-600">
                          {course.completedModules} of {course.totalModules} modules completed
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">Last accessed {course.lastAccessed}</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="w-full bg-purple-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="absolute right-0 top-0 text-sm font-medium text-purple-600">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6">Continue Learning</Button>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">Recent Achievements</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-medium text-purple-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-purple-600">{achievement.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                    value="sarah.johnson@example.com"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Language</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300">
                    <option>English</option>
                    <option>Kinywarwanda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">Notifications</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700">Community updates</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700">Event reminders</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline" className="flex-1">Reset</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-purple-50 py-12 text-center text-gray-600 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4">Need Help?</h3>
            <p className="text-purple-700 mb-6">Our support team is here to assist you with any questions or concerns</p>
            <Button variant="outline" className="bg-white hover:bg-purple-50">Contact Support</Button>
          </div>
          <nav className="mb-4">
            <a href="#" className="mr-6 hover:text-purple-600">About Us</a>
            <a href="#" className="mr-6 hover:text-purple-600">Contact</a>
            <a href="#" className="mr-6 hover:text-purple-600">Privacy Policy</a>
            <a href="#" className="hover:text-purple-600">Terms of Service</a>
          </nav>
          <p className="text-sm text-purple-700">&copy; 2024 AMASIMBI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 