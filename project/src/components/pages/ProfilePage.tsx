import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { profileImages } from '@/assets/images';
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Heart,
  MessageSquare,
  Bookmark,
  Settings
} from 'lucide-react';

interface ProfileData {
  displayName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  education: string;
  interests: string[];
  avatar: string;
}

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    education: user?.education || '',
    interests: user?.interests || [],
    avatar: user?.avatar || profileImages.defaultAvatar
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        education: user.education || '',
        interests: user.interests || [],
        avatar: user.avatar || profileImages.defaultAvatar
      });
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterest = () => {
    if (newInterest && !profileData.interests.includes(newInterest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate required fields
      if (!profileData.displayName.trim()) {
        throw new Error('Display name is required');
      }

      if (!profileData.email.trim()) {
        throw new Error('Email is required');
      }

      // Update profile using AuthContext
      await updateProfile({
        displayName: profileData.displayName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        education: profileData.education,
        interests: profileData.interests,
        avatar: profileData.avatar
      });

      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        education: user.education || '',
        interests: user.interests || [],
        avatar: user.avatar || profileImages.defaultAvatar
      });
    }
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Profile Header */}
      <div className="relative h-[300px] bg-purple-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${profileImages.achievements})` }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex items-end gap-6">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.displayName}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{profileData.displayName}</h1>
              <p className="text-purple-200">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-900">Profile Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.displayName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                        icon={<User className="w-4 h-4" />}
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-900">
                        <User className="w-4 h-4" />
                        {profileData.displayName}
                  </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        icon={<Mail className="w-4 h-4" />}
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-900">
                        <Mail className="w-4 h-4" />
                        {profileData.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        icon={<Phone className="w-4 h-4" />}
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-900">
                        <Phone className="w-4 h-4" />
                        {profileData.phone || 'Not provided'}
                </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin className="w-4 h-4" />
                        {profileData.location || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio || 'No bio provided'}</p>
                  )}
            </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.education}
                      onChange={(e) => setProfileData(prev => ({ ...prev, education: e.target.value }))}
                      icon={<GraduationCap className="w-4 h-4" />}
                      placeholder="Your current education level"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-900">
                      <GraduationCap className="w-4 h-4" />
                      {profileData.education || 'Not provided'}
                    </div>
                  )}
                </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add an interest"
                        />
                        <Button onClick={handleAddInterest}>Add</Button>
                    </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                          >
                            {interest}
                            <button
                              onClick={() => handleRemoveInterest(interest)}
                              className="text-purple-700 hover:text-purple-900"
                            >
                              ×
                            </button>
                  </div>
                ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.length > 0 ? (
                        profileData.interests.map((interest) => (
                          <div
                            key={interest}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                          >
                            {interest}
                      </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No interests added yet</p>
                      )}
                    </div>
                  )}
                  </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-purple-900">24</h3>
                <p className="text-gray-600">Likes Received</p>
                      </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-purple-900">12</h3>
                <p className="text-gray-600">Comments Made</p>
                    </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Bookmark className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-purple-900">8</h3>
                <p className="text-gray-600">Saved Items</p>
              </div>
              </div>
            </div>

          {/* Sidebar */}
                <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Achievements</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Course Completion</h3>
                    <p className="text-sm text-gray-600">Completed 5 courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Career Milestone</h3>
                    <p className="text-sm text-gray-600">Created first portfolio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Commented on "Study Tips"</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Liked "Career Planning"</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
} 