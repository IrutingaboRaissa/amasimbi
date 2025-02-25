import { Book, Heart, Home, MessageCircle, User } from 'lucide-react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Button } from './components/ui/button';

function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:relative md:border-t-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-end md:gap-4">
          <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/learn" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
            <Book size={24} />
            <span className="text-xs">Learn</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
            <MessageCircle size={24} />
            <span className="text-xs">Community</span>
          </Link>
          <Link to="/resources" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
            <Heart size={24} />
            <span className="text-xs">Resources</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
            <User size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-purple-900">AMASIMBI</h1>
          <p className="mt-2 text-lg text-gray-600">Empowering young women through education and mentorship</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reproductive Health Education</h2>
            <p className="text-gray-600 mb-4">Access comprehensive, age-appropriate information about reproductive health.</p>
            <Button>Start Learning</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Support</h2>
            <p className="text-gray-600 mb-4">Connect with peers and mentors in a safe, supportive environment.</p>
            <Button variant="secondary">Join Community</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent Resources</h2>
            <p className="text-gray-600 mb-4">Guides and tips for parents to discuss reproductive health with their children.</p>
            <Button variant="outline">View Resources</Button>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Content</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Understanding Your Body</h3>
              <p className="text-gray-700">Learn about physical and emotional changes during adolescence.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Making Informed Choices</h3>
              <p className="text-gray-700">Discover tools and resources for making healthy life decisions.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function LearnPage() {
  const courses = [
    {
      title: "Understanding Puberty",
      description: "Learn about physical and emotional changes during adolescence",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
      progress: 60
    },
    {
      title: "Menstrual Health",
      description: "Comprehensive guide to menstrual health and hygiene",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
      progress: 30
    },
    {
      title: "Emotional Wellbeing",
      description: "Understanding and managing emotions during adolescence",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
      progress: 0
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-purple-900">Learning Center</h1>
          <p className="text-gray-600 mt-2">Continue your journey of learning and growth</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{course.progress}% complete</p>
                </div>
                <Button className="w-full mt-4">
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function CommunityPage() {
  const discussions = [
    {
      title: "How do you handle stress during exams?",
      author: "Sarah M.",
      replies: 23,
      likes: 45,
      tags: ["Mental Health", "Study Tips"]
    },
    {
      title: "Tips for maintaining a healthy lifestyle",
      author: "Emma K.",
      replies: 15,
      likes: 32,
      tags: ["Health", "Lifestyle"]
    },
    {
      title: "Let's talk about body positivity",
      author: "Lisa R.",
      replies: 56,
      likes: 89,
      tags: ["Body Positivity", "Self Care"]
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-purple-900">Community</h1>
          <p className="text-gray-600 mt-2">Connect, share, and learn from others</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <Button className="w-full">Start a New Discussion</Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{discussion.title}</h3>
                  <p className="text-gray-600 mt-2">Posted by {discussion.author}</p>
                  <div className="flex gap-2 mt-3">
                    {discussion.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4 text-gray-600">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Mental Health</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Self Care</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Health</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Study Tips</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Lifestyle</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ResourcesPage() {
  const resources = [
    {
      title: "Parent's Guide to Teen Health",
      type: "PDF Guide",
      description: "Comprehensive guide for parents on discussing health topics with teens",
      downloadUrl: "#"
    },
    {
      title: "Mental Health Support Directory",
      type: "External Link",
      description: "List of mental health resources and support services",
      downloadUrl: "#"
    },
    {
      title: "Healthy Living Tips",
      type: "Video Series",
      description: "Weekly video series on maintaining a healthy lifestyle",
      downloadUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-purple-900">Resources</h1>
          <p className="text-gray-600 mt-2">Helpful materials and guides for your journey</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {resource.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <Button variant="outline" className="w-full">
                Download Resource
              </Button>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Additional Support?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you find the resources you need. Contact us for personalized assistance.
          </p>
          <Button>Contact Support</Button>
        </section>
      </main>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-purple-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center">
                  <User size={64} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold mt-4">Sarah Johnson</h2>
                <p className="text-gray-600">Member since 2024</p>
                <Button className="mt-4 w-full">Edit Profile</Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Understanding Puberty</span>
                    <span className="text-purple-600">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Menstrual Health</span>
                    <span className="text-purple-600">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    value="sarah.johnson@example.com"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notifications</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-600">Email notifications</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-600">Community updates</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;