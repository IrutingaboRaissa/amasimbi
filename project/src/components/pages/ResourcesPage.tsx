import { Button } from '@/components/ui/button';
import { Search, Download, ExternalLink, PlayCircle, BookOpen, Heart, Share2 } from 'lucide-react';

export function ResourcesPage() {
  const featuredResources = [
    {
      title: "Self-Care Starter Guide",
      type: "Featured Guide",
      description: "A comprehensive guide to building a sustainable self-care routine that fits your lifestyle",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
      downloadUrl: "#",
      category: "Wellness",
      downloads: "1.2K"
    },
    {
      title: "Mindfulness Meditation Series",
      type: "Video Course",
      description: "10-part video series teaching fundamental mindfulness practices for daily life",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1920&auto=format&fit=crop",
      downloadUrl: "#",
      category: "Mental Health",
      downloads: 856
    },
    {
      title: "Women's Health Encyclopedia",
      type: "Digital Book",
      description: "Everything you need to know about women's health, written by leading experts",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop",
      downloadUrl: "#",
      category: "Health",
      downloads: "2.3K"
    }
  ];

  const categories = [
    { name: "Mental Wellness", icon: Heart, count: 24 },
    { name: "Physical Health", icon: BookOpen, count: 18 },
    { name: "Personal Growth", icon: PlayCircle, count: 15 },
    { name: "Relationships", icon: Share2, count: 12 }
  ];

  const resources = [
    {
      title: "Parent's Guide to Teen Health",
      type: "PDF Guide",
      description: "Comprehensive guide for parents on discussing health topics with teens",
      category: "Parenting",
      downloadUrl: "#",
      downloads: 450
    },
    {
      title: "Mental Health Support Directory",
      type: "External Link",
      description: "List of mental health resources and support services",
      category: "Mental Health",
      downloadUrl: "#",
      downloads: 780
    },
    {
      title: "Healthy Living Tips",
      type: "Video Series",
      description: "Weekly video series on maintaining a healthy lifestyle",
      category: "Lifestyle",
      downloadUrl: "#",
      downloads: 623
    },
    {
      title: "Women's Fitness Guide",
      type: "Interactive PDF",
      description: "Customizable fitness plans designed specifically for women",
      category: "Fitness",
      downloadUrl: "#",
      downloads: 892
    },
    {
      title: "Nutrition Made Simple",
      type: "E-Book",
      description: "Easy-to-follow nutrition guide with meal plans and recipes",
      category: "Nutrition",
      downloadUrl: "#",
      downloads: 567
    },
    {
      title: "Stress Management Toolkit",
      type: "Resource Kit",
      description: "Collection of tools and techniques for managing daily stress",
      category: "Mental Health",
      downloadUrl: "#",
      downloads: 734
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <header className="bg-purple-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto text-center relative z-10 px-4">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">Resources & Guides</h1>
          <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">Discover our carefully curated collection of resources designed to support your personal growth and well-being journey</p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="search"
              placeholder="Search resources..."
              className="w-full px-6 py-4 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">Featured Resources</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 group hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-white/90 text-purple-700 px-4 py-1 rounded-full text-sm">
                    {resource.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-purple-900">{resource.title}</h3>
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-100">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-600">{resource.downloads} downloads</span>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Download size={18} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">Browse by Category</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">{category.name}</h3>
                      <p className="text-sm text-purple-600">{category.count} resources</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* All Resources */}
        <section>
          <h2 className="text-3xl font-bold text-purple-900 mb-8">All Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-100">
                    {resource.category}
                  </span>
                  <span className="text-sm text-purple-600">{resource.downloads} downloads</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-600">{resource.type}</span>
                  <Button variant="outline" className="text-purple-600 border-purple-200">
                    {resource.type === "External Link" ? <ExternalLink size={18} className="mr-2" /> : <Download size={18} className="mr-2" />}
                    {resource.type === "External Link" ? "Visit Link" : "Download"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Need Additional Support?</h2>
              <p className="text-lg text-purple-700 mb-8">
                Our team is here to help you find the resources you need. Reach out for personalized assistance and guidance on your journey.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-white text-purple-700 hover:bg-purple-50">
                  Contact Support
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-purple-700 hover:bg-white/20">
                  Browse FAQ
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-50 py-12 text-center text-gray-600 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4">Stay Updated</h3>
            <p className="text-purple-700 mb-6">Subscribe to receive updates when we add new resources</p>
            <div className="flex gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 w-64"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">
                Subscribe
              </Button>
            </div>
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