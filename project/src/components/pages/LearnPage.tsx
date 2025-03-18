import { Button } from '@/components/ui/button';
import { Search, BookOpen, Clock, Star, Trophy, Users, ChevronRight, PlayCircle, BookmarkPlus } from 'lucide-react';
import learn from '@/assets/images/learn.png';

export function LearnPage() {
  const categories = [
    { name: "All Courses", count: 12 },
    { name: "In Progress", count: 3 },
    { name: "Completed", count: 2 },
    { name: "Bookmarked", count: 5 }
  ];

  const courses = [
    {
      title: "Understanding Puberty",
      description: "Learn about physical and emotional changes during adolescence",
      image: "src/assets/images/ber.jpg",
      progress: 60,
      duration: "2 hours",
      students: 1234,
      rating: 4.8,
      instructor: "Dr. Sarah Williams",
      level: "Beginner"
    },
    {
      title: "Menstrual Health",
      description: "Comprehensive guide to menstrual health and hygiene",
      image: "src/assets/images/it.jpg",
      progress: 30,
      duration: "1.5 hours",
      students: 856,
      rating: 4.9,
      instructor: "Dr. Emily Chen",
      level: "All Levels"
    },
    {
      title: "Contraceptive Methods",
      description: "Understanding available contraceptive methods, dosage, and their side effects",
      image: "src/assets/images/cont.webp",
      progress: 0,
      duration: "3 hours",
      students: 2156,
      rating: 4.7,
      instructor: "Dr. Maria Rodriguez",
      level: "Intermediate"
    },
    {
      title: "Healthy Relationships and Consent",
      description: "Learn about building healthy relationships and understanding consent",
      image: "src/assets/images/Relationship.webp",
      progress: 60,
      duration: "2.5 hours",
      students: 1567,
      rating: 4.9,
      instructor: "Dr. Lisa Thompson",
      level: "All Levels"
    },
    {
      title: "Sexual and Reproductive Health Rights",
      description: "Understanding your rights related to sexual and reproductive health",
      image: "src/assets/images/Gender-Equality.jpg",
      progress: 30,
      duration: "2 hours",
      students: 987,
      rating: 4.8,
      instructor: "Dr. Amanda Johnson",
      level: "Intermediate"
    },
    {
      title: "Pregnancy and Childbirth",
      description: "Information about pregnancy, childbirth, and related care",
      image: "src/assets/images/chib.jpg",
      progress: 0,
      duration: "4 hours",
      students: 3245,
      rating: 4.9,
      instructor: "Dr. Rachel Green",
      level: "Advanced"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <header className="bg-purple-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto text-center relative z-10 px-4">
          <img
            src={learn}
            alt="learn"
            className="w-16 h-16 text-purple-600 mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold text-purple-900 mb-4">
            Learning Center
          </h1>
          <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">
            Embark on a journey of discovery and empowerment through our carefully curated courses
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="search"
              placeholder="Search for courses..."
              className="w-full px-6 py-4 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <p className="italic text-2xl text-purple-800 font-serif mb-2">
            <i>"Ugendagenda utabaza ugasaza utamenye"</i>
          </p>
          <p className="text-lg text-purple-600">
            "If you travel without asking, you will grow old without knowing."
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-3 rounded-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              {category.name}
              <span className="bg-purple-100 px-2 py-1 rounded-full text-sm">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-shadow group"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-white flex items-center gap-2">
                    <PlayCircle size={20} /> Preview Course
                  </span>
                  <button className="text-white hover:text-purple-200">
                    <BookmarkPlus size={20} />
                  </button>
                </div>
                <span className="absolute top-4 right-4 bg-white/90 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="border-t border-purple-50 pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-900">{course.instructor}</p>
                      <p className="text-xs text-gray-500">Instructor</p>
                    </div>
                  </div>

                  {course.progress > 0 ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-700">{course.progress}% complete</span>
                        <span className="text-gray-500">
                          {Math.round((course.progress / 100) * 12)} / 12 lessons
                        </span>
                      </div>
                      <div className="w-full bg-purple-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <Button className="w-full group">
                    <span>{course.progress > 0 ? "Continue Learning" : "Start Course"}</span>
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Ready to Start Learning?</h2>
              <p className="text-lg text-purple-700 mb-8">
                Join thousands of women who are taking control of their health education journey
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-white text-purple-700 hover:bg-purple-50">
                  View All Courses
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-purple-700 hover:bg-white/20">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-50 py-12 text-center text-gray-600 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4">Need Learning Support?</h3>
            <p className="text-purple-700 mb-6">Our education team is here to help you achieve your learning goals</p>
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