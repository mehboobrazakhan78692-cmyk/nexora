'use client';

import Link from 'next/link';
import { Shield, Zap, Globe, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Projects Deployed', value: '10K+' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Customer Satisfaction', value: '4.9/5' }
];

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'We prioritize security in everything we build. Your data is encrypted and protected with enterprise-grade security measures.'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast performance is not optional. We optimize every aspect of our platform for speed and efficiency.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Our infrastructure spans multiple regions worldwide, ensuring low latency and high availability for all users.'
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your success is our success. We provide exceptional support and continuously improve based on your feedback.'
  }
];

const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'NEXORA was born from a vision to make enterprise-grade tools accessible to everyone.'
  },
  {
    year: '2021',
    title: 'First Major Release',
    description: 'Launched our core platform with authentication, RBAC, and admin dashboard.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded to serve customers in 50+ countries with multi-region infrastructure.'
  },
  {
    year: '2023',
    title: 'Enterprise Ready',
    description: 'Added SSO, SAML, and advanced analytics for enterprise customers.'
  },
  {
    year: '2024',
    title: 'AI Integration',
    description: 'Introduced AI-powered insights and automation features.'
  }
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    name: 'Emily Johnson',
    role: 'VP of Product',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    name: 'David Kim',
    role: 'VP of Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                NEXORA
              </Link>
              <nav className="hidden md:flex ml-10 gap-8">
                <Link href="/features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</Link>
                <Link href="/about" className="text-primary-600 font-medium">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Building the Future of
              <span className="text-primary-600"> SaaS</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to make enterprise-grade development tools accessible, 
              affordable, and easy to use for developers and teams of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From startup to industry leader
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary-200" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`p-6 bg-white rounded-xl shadow-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <span className="text-primary-600 font-bold text-lg">{item.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary-600 rounded-full mx-4 relative z-10 flex-shrink-0" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind NEXORA
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're always looking for talented people to join our mission.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white">NEXORA</span>
              <p className="text-gray-400 mt-1">Advanced Full Stack Platform</p>
            </div>
            <div className="flex gap-6">
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © {new Date().getFullYear()} NEXORA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
