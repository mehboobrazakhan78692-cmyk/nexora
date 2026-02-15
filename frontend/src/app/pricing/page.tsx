'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individual developers and small projects',
    price: 0,
    period: 'forever',
    features: [
      'Up to 3 team members',
      '5 projects',
      'Basic analytics',
      'Email support',
      '1GB storage',
      'API access'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Professional',
    description: 'Best for growing teams and businesses',
    price: 49,
    period: 'month',
    features: [
      'Up to 25 team members',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '100GB storage',
      'API access',
      'Custom domains',
      'SSO authentication'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: 199,
    period: 'month',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Custom analytics',
      'Dedicated support',
      'Unlimited storage',
      'API access',
      'Custom domains',
      'SSO authentication',
      'SLA guarantee',
      'Custom integrations',
      'On-premise option'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Professional plan comes with a 14-day free trial. No credit card required.'
  },
  {
    question: 'What happens when my trial ends?',
    answer: 'You can choose to upgrade to a paid plan or continue with our free Starter plan.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period.'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
                <Link href="/pricing" className="text-primary-600 font-medium">Pricing</Link>
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
              Simple, Transparent
              <span className="text-primary-600"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-8 bg-primary-600 rounded-full transition-colors"
              >
                <span 
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'}`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
                <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 ${plan.popular ? 'ring-2 ring-primary-600 shadow-xl' : 'border border-gray-200 shadow-sm'} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${billingCycle === 'yearly' && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500">/{billingCycle === 'yearly' ? 'month' : plan.period}</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && plan.price > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Billed annually (${Math.round(plan.price * 0.8 * 12)}/year)
                    </p>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full py-3 px-6 text-center rounded-xl font-semibold transition-all ${
                    plan.popular 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? We're here to help.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            Contact Sales
            <ArrowRight className="ml-2 w-5 h-5" />
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
