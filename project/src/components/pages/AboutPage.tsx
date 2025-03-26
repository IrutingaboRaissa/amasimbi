import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Heart, BookOpen, Shield } from 'lucide-react';

export function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Mutesi",
      role: "Medical Director",
      description: "Specialist in reproductive health with 15 years of experience"
    },
    {
      name: "Marie Claire Uwamahoro",
      role: "Community Lead",
      description: "Expert in youth education and community engagement"
    },
    {
      name: "Jean Paul Mugisha",
      role: "Technology Lead",
      description: "Digital health platform specialist"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Privacy & Safety",
      description: "We ensure a safe, confidential environment for all users"
    },
    {
      icon: Heart,
      title: "Empathy & Support",
      description: "Creating a supportive community for learning and growth"
    },
    {
      icon: BookOpen,
      title: "Education First",
      description: "Providing accurate, age-appropriate information"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building strong connections among young women"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-6">
            About AMASIMBI
          </h1>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto">
            AMASIMBI is dedicated to empowering young women in Rwanda through comprehensive 
            reproductive health education and community support.
          </p>
        </div>
      </section>

      {/* Mission & Impact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-purple-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Mission</h2>
              <p className="text-lg text-purple-700">
                To bridge the information gap in reproductive health education by providing 
                accessible, culturally sensitive resources and creating a supportive community 
                for young women aged 12-25 in Rwanda.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Impact</h2>
              <ul className="space-y-4 text-lg text-purple-700">
                <li>• Over 10,000 young women reached</li>
                <li>• 50+ expert contributors</li>
                <li>• 100+ educational resources</li>
                <li>• Active community support network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <value.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-purple-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 mb-12 text-center">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-purple-700">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-purple-700 mb-8">
            Be part of our mission to empower young women through education and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 