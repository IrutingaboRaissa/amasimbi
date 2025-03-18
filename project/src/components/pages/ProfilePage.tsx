import { User, Bell, Settings, BookOpen, Award, Heart, Calendar, Edit, Camera, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfilePage() {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <header className="bg-purple-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-purple-200">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
                <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </button>
              </div>
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                <Edit size={16} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-purple-900 mb-2">Sarah Johnson</h1>
              <p className="text-purple-700 mb-4">Member since January 2024</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline" className="bg-white/80 hover:bg-white">
                  <Settings size={18} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="bg-white/80 hover:bg-white">
                  <Bell size={18} className="mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700">
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

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