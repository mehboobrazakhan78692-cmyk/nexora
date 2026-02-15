'use client';

import Link from 'next/link';
import { 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  BarChart3, 
  Lock, 
  Cloud, 
  Headphones,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Role-Based Access Control',
    description: 'Define custom roles and permissions with granular control over user access to different features and data.',
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Built on modern tech stack ensuring lightning-fast response times and optimal user experience.',
    color: 'bg-yellow-500'
  },
  {
    icon: Globe,
    title: 'Global Infrastructure',
    description: 'Deploy worldwide with CDN support and data centers across multiple regions for low latency.',
    color: 'bg-green-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with real-time updates, comments, and shared workspaces.',
    color: 'bg-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Gain insights with comprehensive dashboards, custom reports, and data visualization tools.',
    color: 'bg-pink-500'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SSO integration, and compliance with industry standards.',
    color: 'bg-red-500'
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'Fully containerized with Kubernetes support for easy scaling and deployment.',
    color: 'bg-cyan-500'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support with dedicated account managers for enterprise clients.',
    color: 'bg-indigo-500'
  }
];

const benefits = [
  '99.9% Uptime SLA',
  'SOC 2 Type II Compliant',
  'GDPR Ready',
  'ISO 27001 Certified',
  'Real-time Backups',
  'Zero Trust Architecture'
];

export default function FeaturesPage() {
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
                <Link href="/features" className="text-primary-600 font-medium">Features</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</Link>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
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
              Powerful Features for
              <span className="text-primary-600"> Modern Teams</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything you need to build, scale, and manage your SaaS application. 
              From authentication to analytics, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with security, compliance, and reliability at its core
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of developers building amazing applications with NEXORA.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Talk to Sales
            </Link>
          </div>
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
