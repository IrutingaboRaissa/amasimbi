import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  Users,
  BookMarked,
  ArrowRight,
  Star,
  CheckCircle2,
  Heart,
  Calendar,
  ChevronRight,
  Shield
} from 'lucide-react';
import { homeImages } from '@/assets/images';
import { toast } from 'react-hot-toast';

const features = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Interactive Learning',
    description: 'Engage with dynamic content and real-world projects',
    image: homeImages.feature1
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community Support',
    description: 'Connect with peers and mentors in a supportive environment',
    image: homeImages.feature2
  },
  {
    icon: <BookMarked className="w-8 h-8" />,
    title: 'Rich Resources',
    description: 'Access a vast library of educational materials and tools',
    image: homeImages.feature3
  }
];

const testimonials = [
  {
    name: 'Sarah Ineza',
    role: 'High School Student',
    content: 'Amasimbi is  teaching young women what they need to know about health and life, including what they parents didn\' get the courage to tell them.',
    image: homeImages.testimonial1
  },
  {
    name: 'Emma Ishimwe',
    role: 'College Student',
    content: 'I love how Amasimbi combines education with community. It\'s more than just learning - it\'s growing together.',
    image: homeImages.testimonial2
  },
  {
    name: 'Lisa Mutoni',
    role: 'College Student',
    content: 'The platform\'s focus on my personal growth and health .',
    image: homeImages.testimonial3
  }
];

const benefits = [
  'Age-appropriate content for 12-25 year olds',
  'Interactive learning experiences',
  'Supportive community environment',
  'Expert-led resources',
  'Personalized learning paths',
  'Regular progress tracking'
];

const upcomingEvents = [
  {
    title: "Women's Health Workshop",
    date: "March 15, 2024",
    time: "2:00 PM",
    location: "Online",
    spots: "50 spots available"
  },
  {
    title: "Parent-Teen Communication Session",
    date: "March 18, 2024",
    time: "3:30 PM",
    location: "Online",
    spots: "30 spots available"
  }
];

export function HomePage() {
  const { user, isAuthenticated } = useAuth();

  const handleEventRegistration = (eventTitle: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to register for events');
      return;
    }
    toast.success(`Successfully registered for ${eventTitle}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeImages.hero})` }}
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
            <h1 className="text-5xl font-bold mb-6">
              Empowering Young Minds Through Education
            </h1>
            <p className="text-xl mb-8">
              Join our community of learners aged 12-25 and discover a world of opportunities through interactive learning and supportive connections.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                    Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Why Choose Amasimbi?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Amasimbi focuses on equiping young women with the knowledge and skills they need to navigate life and health. As this platform provides research based information, and testimonies from young women who have been through the same challenges, it is a great resource for young women.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-purple-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Platform Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes Amasimbi the perfect learning platform for young minds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">What Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community members about their experiences with Amasimbi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
                Upcoming Events
              </h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-purple-600">
                          <span>{event.date} at {event.time}</span>
                          <span>•</span>
                          <span>{event.location}</span>
                          <span>•</span>
                          <span>{event.spots}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="shrink-0"
                        onClick={() => handleEventRegistration(event.title)}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community of learners and discover a world of opportunities through interactive learning and supportive connections.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  Get Started Today <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}