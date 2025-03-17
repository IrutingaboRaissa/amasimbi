import { Button } from '@/components/ui/button';
import { Heart, Users, BookOpen, ArrowRight, Star, Calendar, ChevronRight, Shield } from 'lucide-react';
import strongw from '@/assets/images/strongw.png';
import mission from '@/assets/images/mission.png';
import vision from '@/assets/images/vision.jpg';
import community from '@/assets/images/community.jpg';
import parents from '@/assets/images/parents-ados-03.jpg';
import repro from '@/assets/images/repro.jpg';
import Body from '@/assets/images/body.jpg';
import dec from '@/assets/images/dec.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCommunityClick = () => {
    if (isAuthenticated) {
      navigate('/community');
    } else {
      navigate('/login');
    }
  };

  const stats = [
    { number: "10K+", label: "Active Members", icon: Users },
    { number: "50+", label: "Expert Contributors", icon: Star },
    { number: "100+", label: "Resources Available", icon: BookOpen },
    { number: "24/7", label: "Community Support", icon: Heart }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={strongw}
            alt="Strong Women"
            className="px-96 py-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-900/85 to-purple-800/80"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Your Journey to Knowledge and Empowerment Starts Here
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 leading-relaxed">
              Join our supportive community of women learning, growing, and empowering each other through comprehensive health education and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-6 sm:px-8 w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 rounded-full px-6 sm:px-8 w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 sm:p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-2">{stat.number}</h3>
                  <p className="text-purple-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-6 rounded-2xl bg-purple-100 p-3">
                <img
                  src={vision}
                  alt="Vision Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3 sm:mb-4">
                Our Vision
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                AMASIMBI is designed to address the critical issue of early pregnancies in Rwanda by providing accessible, culturally sensitive reproductive health education. The platform specifically targets young women (ages 12-25) who lack access to comprehensive reproductive health information due to cultural taboos and limited parent-child communication.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-6 rounded-2xl bg-purple-100 p-3">
                <img
                  src={mission}
                  alt="Mission Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3 sm:mb-4">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To bridge the gap by providing research-based information, comprising testimonies, and age-appropriate details about different contraceptive methods and their side effects. We empower young women with knowledge to make informed decisions about their reproductive health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 text-center">
            Key Programs
          </h2>
          <p className="text-lg sm:text-xl text-purple-600 mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            Discover our comprehensive programs designed to support your journey of learning and growth
          </p>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Reproductive Health Education */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 group hover:shadow-xl transition-all">
              <div className="relative h-48 sm:h-64">
                <img
                  src={repro}
                  alt="Reproductive Health"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">
                  Reproductive Health Education
                </h3>
                <p className="text-gray-600 mb-6">
                  Access comprehensive, age-appropriate information about reproductive health, delivered by expert healthcare professionals.
                </p>
                <Button className="w-full group">
                  Learn More
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Community Support */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 group hover:shadow-xl transition-all">
              <div className="relative h-48 sm:h-64">
                <img
                  src={community}
                  alt="Community"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">
                  Community Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Connect with peers, share experiences, and find support in our safe and moderated community platform.
                </p>
                <Link to="/community">
                  <Button className="w-full group">
                    Join Community
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Parent Resources */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 group hover:shadow-xl transition-all">
              <div className="relative h-48 sm:h-64">
                <img
                  src={parents}
                  alt="Parent Resources"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">
                  Parent Resources
                </h3>
                <p className="text-gray-600 mb-6">
                  Find helpful guides and resources to facilitate meaningful conversations about reproductive health with your teens.
                </p>
                <Button className="w-full group">
                  Access Resources
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4">
              Featured Content
            </h2>
            <p className="text-lg sm:text-xl text-purple-600 max-w-3xl mx-auto">
              Explore our carefully curated content designed to support your learning journey
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Understanding Your Body */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all">
              <div className="relative h-48 sm:h-64">
                <img
                  src={Body}
                  alt="Understanding Your Body"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">
                  Understanding Your Body
                </h3>
                <p className="text-gray-700 mb-6">
                  Learn about the amazing changes your body goes through and how to embrace them with confidence. Our expert-led guides provide clear, accurate information about female anatomy and development.
                </p>
                <a 
                  href="https://drtarasalay.com/importance-of-knowing-your-body/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="group">
                    Read More
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Making Informed Choices */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all">
              <div className="relative h-48 sm:h-64">
                <img
                  src={dec}
                  alt="Making Informed Choices"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">
                  Making Informed Choices
                </h3>
                <p className="text-gray-700 mb-6">
                  Discover how to make confident, informed decisions about your reproductive health. Access expert resources and learn from real experiences to guide your choices.
                </p>
                <a 
                  href="https://www.indeed.com/career-advice/career-development/informed-decision" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="group">
                    Read More
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
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
                      <Button variant="outline" className="shrink-0">
                        Register Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" className="bg-white hover:bg-purple-50">
                  View All Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-purple-700 mb-8">
              Join our supportive community and gain access to comprehensive resources, expert guidance, and peer support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8">
                Create Free Account
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Browse Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-purple-50 py-12 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4">Stay Connected</h3>
            <p className="text-purple-700 mb-6">Join our newsletter to receive updates and helpful resources</p>
            <div className="flex gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 w-64"
              />
              <Button className="rounded-full">
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