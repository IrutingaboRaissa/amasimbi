import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { learnImages } from '@/assets/images';
import {
  BookOpen,
  Users,
  Shield,
  Heart,
  MessageCircle,
  GraduationCap,
  Search,
  Filter,
  Clock,
  Users as UsersIcon,
  Star,
  ChevronRight
} from 'lucide-react';

const categories = [
  {
    id: 'reproductive-health',
    title: 'Reproductive Health',
    description: 'Learn about your body, menstrual health, and reproductive system.',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'contraception',
    title: 'Contraception',
    description: 'Understanding different contraceptive methods and their effectiveness.',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'parent-child',
    title: 'Parent-Child Communication',
    description: 'Resources for open and healthy family discussions about reproductive health.',
    icon: MessageCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'cultural-sensitivity',
    title: 'Cultural Sensitivity',
    description: 'Understanding cultural contexts while making informed health decisions.',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

const articles = [
  {
    id: 1,
    title: 'Understanding Your Menstrual Cycle',
    description: 'A comprehensive guide to menstrual health and cycle tracking.',
    duration: '15 min read',
    level: 'Beginner',
    category: 'reproductive-health',
    image: learnImages.courses.course1,
    author: 'Dr. Marie Uwimana',
    date: 'March 20, 2024',
  },
  {
    id: 2,
    title: 'Types of Contraceptive Methods',
    description: 'Learn about different contraceptive options and their effectiveness rates.',
    duration: '20 min read',
    level: 'Intermediate',
    category: 'contraception',
    image: learnImages.courses.course2,
    author: 'Dr. Jean Pierre',
    date: 'March 18, 2024',
  },
  {
    id: 3,
    title: 'Talking to Your Parents About Reproductive Health',
    description: 'Tips for initiating important conversations with family members.',
    duration: '12 min read',
    level: 'Beginner',
    category: 'parent-child',
    image: learnImages.courses.course3,
    author: 'Sarah Mukamana',
    date: 'March 15, 2024',
  },
  {
    id: 4,
    title: 'Cultural Perspectives on Reproductive Health',
    description: 'Understanding and navigating cultural beliefs about reproductive health.',
    duration: '18 min read',
    level: 'Intermediate',
    category: 'cultural-sensitivity',
    image: learnImages.courses.course4,
    author: 'Dr. Emmanuel',
    date: 'March 12, 2024',
  },
  {
    id: 5,
    title: 'Parent Guide: Supporting Your Teen',
    description: 'A guide for parents on supporting their children\'s reproductive health journey.',
    duration: '25 min read',
    level: 'Advanced',
    category: 'parent-child',
    image: learnImages.courses.course5,
    author: 'Dr. Grace',
    date: 'March 10, 2024',
  },
  {
    id: 6,
    title: 'Making Informed Health Decisions',
    description: 'How to make empowered choices about your reproductive health.',
    duration: '15 min read',
    level: 'Intermediate',
    category: 'reproductive-health',
    image: learnImages.courses.course6,
    author: 'Dr. Patrick',
    date: 'March 8, 2024',
  },
];

export function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src={learnImages.hero}
            alt="Learning background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Reproductive Health Education
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            Access research-based information and resources for making informed decisions about your reproductive health.
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card 
                className={`cursor-pointer ${selectedCategory === category.id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center mb-4`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Educational Articles</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full">
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.duration}</span>
                    <span>•</span>
                    <span>{article.level}</span>
              </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4" />
                    <span>By {article.author}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          </div>
        </section>
    </div>
  );
} 