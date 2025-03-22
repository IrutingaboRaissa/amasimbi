import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, Shield, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Williams",
      role: "Medical Director",
      image: "src/assets/images/team/sarah.jpg",
      description: "Specializes in adolescent reproductive health with over 15 years of experience."
    },
    {
      name: "Emily Chen",
      role: "Education Coordinator",
      image: "src/assets/images/team/emily.jpg",
      description: "Passionate about creating accessible health education programs for young women."
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Health Advisor",
      image: "src/assets/images/team/maria.jpg",
      description: "Expert in women's health and reproductive medicine."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "We prioritize creating a safe, confidential environment for learning and sharing."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Empathy & Support",
      description: "Our approach is rooted in understanding and supporting each individual's journey."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Quality Education",
      description: "We provide accurate, research-based information tailored for young women."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Building a supportive network of peers and mentors for shared growth."
    }
  ];

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
              About Amasimbi
            </h1>
            <p className="text-lg text-purple-700 mb-8">
              Empowering young women through accessible, comprehensive reproductive health education
              and community support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-purple-900 mb-6">Our Mission</h2>
              <p className="text-lg text-purple-700 mb-6">
                Amasimbi is dedicated to addressing the critical issue of early pregnancies in Rwanda
                by providing accessible, culturally sensitive reproductive health education. We focus
                on empowering young women aged 12-25 who may lack access to comprehensive reproductive
                health information due to cultural taboos and limited parent-child communication.
              </p>
              <p className="text-lg text-purple-700 mb-6">
                Through our platform, we aim to bridge the knowledge gap by providing research-based
                information, real-life testimonies, and age-appropriate details about reproductive
                health, enabling young women to make informed decisions about their health and future.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="src/assets/images/mission-image.jpg"
                  alt="Young women in a learning session"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Values</h2>
            <p className="text-lg text-purple-700">
              The principles that guide our work and commitment to empowering young women
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{value.title}</h3>
                <p className="text-purple-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Team</h2>
            <p className="text-lg text-purple-700">
              Meet the dedicated professionals working to make reproductive health education
              accessible to all young women
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-purple-700">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-purple-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-purple-700 mb-8">
              Be part of our mission to empower young women through education and community support
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 