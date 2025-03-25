import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { homeImages } from '@/assets/images';
import {
  Target,
  Heart,
  Users,
  Shield,
  GraduationCap,
  MessageCircle,
  Globe,
  Award
} from 'lucide-react';

const missionPoints = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower young women in Rwanda with knowledge and support to make informed decisions about their reproductive health while respecting cultural values.'
  },
  {
    icon: Heart,
    title: 'Our Vision',
    description: 'A Rwanda where every young woman has access to accurate reproductive health information and support, leading to healthier communities.'
  },
  {
    icon: Users,
    title: 'Our Impact',
    description: 'We aim to reduce early pregnancies and improve educational outcomes for young women through education and mentorship.'
  }
];

const values = [
  {
    icon: Shield,
    title: 'Safety & Privacy',
    description: 'We prioritize the safety and privacy of our users, ensuring a secure environment for learning and sharing.'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'We believe in the power of education to empower young women to make informed decisions.'
  },
  {
    icon: MessageCircle,
    title: 'Open Dialogue',
    description: 'We promote open and respectful dialogue about reproductive health within cultural contexts.'
  },
  {
    icon: Globe,
    title: 'Cultural Sensitivity',
    description: 'We respect and incorporate cultural values while providing essential health information.'
  }
];

const team = [
  {
    name: 'Dr. Marie Uwimana',
    role: 'Founder & Medical Director',
    image: homeImages.testimonial1,
    bio: 'A healthcare professional with over 15 years of experience in reproductive health education.'
  },
  {
    name: 'Sarah Mukamana',
    role: 'Community Engagement Lead',
    image: homeImages.testimonial2,
    bio: 'Passionate about creating safe spaces for young women to learn and grow.'
  },
  {
    name: 'Dr. Jean Pierre',
    role: 'Health Education Specialist',
    image: homeImages.testimonial3,
    bio: 'Expert in developing culturally sensitive health education programs.'
  }
];

export function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src={homeImages.hero}
            alt="About Amasimbi"
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
            About Amasimbi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            Empowering young women in Rwanda through education and support
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>{point.title}</CardTitle>
                  <CardDescription>{point.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription>{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full">
                <div className="relative h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help us create a better future for young women in Rwanda by supporting our educational initiatives.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Get Involved
          </Button>
        </div>
      </section>
    </div>
  );
} 