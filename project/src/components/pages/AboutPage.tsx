import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, BookOpen, Shield, Award, Target } from 'lucide-react';
import { homeImages } from '@/assets/images';

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Empathy',
    description: 'We provide information that is relevant to young women and that they can relate to.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community',
    description: 'We foster a supportive environment where everyone can learn and grow together.'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Education',
    description: 'We believe in providing quality information that is based on research and testimonies from young women who have been through the same challenges.'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Safety',
    description: 'We ensure a secure and trusted environment for all our users.'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do to serve our community better.'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Innovation',
    description: 'We continuously innovate to provide information that is up to date and relevant to young women.'
  }
];

const team = [
  {
    name: 'Raissa Irutingabo',
    role: 'Founder & CEO',
    bio: 'African Leadership University Student, striving to make a difference in the lives of young women.',
    image: homeImages.testimonial1
  },
  {
    name: 'David Mutoni',
    role: 'Univesity of Rwanda Student, and consultant at AMASIMBI',
    bio: 'David brings his knowledge in reproductive health and life skills to the project.',
    image: homeImages.testimonial3
  }
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeImages.hero})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-70" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl font-bold mb-6">
              Our Mission
            </h1>
            <p className="text-xl mb-8">
              At Amasimbi, we're dedicated to empowering young minds through accessible, 
              quality education and fostering a supportive community for growth and learning.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Join Our Community <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at Amasimbi, from developing our 
              platform to interacting with our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-purple-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals behind Amasimbi who work tirelessly to 
              make quality education accessible to all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Be part of our mission to transform education and empower the next generation 
              of learners. Start your journey with Amasimbi today.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Get Started Today <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 