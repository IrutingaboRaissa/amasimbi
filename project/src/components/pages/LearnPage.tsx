import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { learnImages } from '@/assets/images';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ChevronRight,
  Search,
  Filter,
  BookMarked,
  Award,
  GraduationCap
} from 'lucide-react';

const categories = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Academic Excellence',
    description: 'Core subjects and advanced topics',
    color: 'bg-blue-500'
  },
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: 'Life Skills',
    description: 'Personal development and practical skills',
    color: 'bg-green-500'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Career Development',
    description: 'Professional skills and career guidance',
    color: 'bg-purple-500'
  }
];

const courses = [
  {
    id: 1,
    title: 'Mathematics Fundamentals',
    description: 'Master essential mathematical concepts and problem-solving skills.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 1200,
    rating: 4.8,
    image: learnImages.courses.course1,
    category: 'Academic Excellence'
  },
  {
    id: 2,
    title: 'Personal Finance Basics',
    description: 'Learn essential money management skills for your future.',
    duration: '6 weeks',
    level: 'Beginner',
    students: 850,
    rating: 4.9,
    image: learnImages.courses.course2,
    category: 'Life Skills'
  },
  {
    id: 3,
    title: 'Career Planning Workshop',
    description: 'Discover your career path and develop professional skills.',
    duration: '4 weeks',
    level: 'Intermediate',
    students: 600,
    rating: 4.7,
    image: learnImages.courses.course3,
    category: 'Career Development'
  }
];

export function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${learnImages.hero})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-60" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl font-bold mb-4">Learning Hub</h1>
            <p className="text-xl mb-8">
              Explore our comprehensive collection of courses designed to help you grow academically, personally, and professionally.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${category.color} rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => setSelectedCategory(category.title)}
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="opacity-90">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Courses Grid */}
        <section>
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                    </div>
                  </div>
                  <Link to={`/learn/${course.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Start Learning <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 