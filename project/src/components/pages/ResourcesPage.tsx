import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Link as LinkIcon,
  Download,
  Search,
  BookOpen,
  Video,
  FileQuestion,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'guide';
  category: string;
  url: string;
  fileSize?: string;
  duration?: string;
}

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const resources: Resource[] = [
    {
      id: '1',
      title: "Understanding Your Body - Comprehensive Guide",
      description: "A detailed guide about female anatomy and development during puberty.",
      type: "document",
      category: "Health Education",
      url: "/resources/understanding-body-guide.pdf",
      fileSize: "2.4 MB"
    },
    {
      id: '2',
      title: "Menstrual Health and Hygiene",
      description: "Learn about menstrual health, hygiene practices, and self-care during periods.",
      type: "video",
      category: "Health Education",
      url: "https://youtube.com/watch?v=example1",
      duration: "15:30"
    },
    {
      id: '3',
      title: "Parent-Teen Communication Guide",
      description: "Tips and strategies for better communication between parents and teens.",
      type: "guide",
      category: "Family Resources",
      url: "/resources/parent-teen-guide.pdf",
      fileSize: "1.8 MB"
    },
    {
      id: '4',
      title: "WHO Reproductive Health Resources",
      description: "Access trusted information from the World Health Organization.",
      type: "link",
      category: "External Resources",
      url: "https://www.who.int/health-topics/sexual-and-reproductive-health"
    }
  ];

  const categories = Array.from(new Set(resources.map(r => r.category)));

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'link':
        return <LinkIcon className="w-6 h-6" />;
      case 'guide':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <FileQuestion className="w-6 h-6" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              Resources
            </h1>
            <p className="text-lg text-purple-700 mb-8">
              Access our collection of educational materials, guides, and trusted external resources
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="w-full pl-12 border-purple-200 focus:ring-purple-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter size={18} className="mr-2" />
                {selectedCategory || 'All Categories'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-purple-700 text-sm mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600">
                        {resource.fileSize || resource.duration || 'External Link'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resource.url, '_blank')}
                        className="gap-2"
                      >
                        {resource.type === 'document' || resource.type === 'guide' ? (
                          <>
                            <Download size={16} />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink size={16} />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 