'use client';

import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CompaniesSection from './components/CompaniesSection';
import FeatureShowcase from './components/FeatureShowcase';
import CoreFeaturesGrid from './components/CoreFeaturesGrid';
import TrustSection from './components/TrustSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const emails = JSON.parse(localStorage.getItem('earlyAccessEmails') || '[]');
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('earlyAccessEmails', JSON.stringify(emails));
      }
      console.log('Email stored:', email);
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="site-shell min-h-screen overflow-hidden text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navigation onScroll={handleScroll} />

        <HeroSection onScroll={handleScroll} />

        <CompaniesSection />

        <FeatureShowcase
          title="Client Management That <span class='text-gray-700'>Actually Works</span>"
          description="Never lose a client message again. Centralize all communications, store notes, and track project history in one unified workspace."
          features={[
            'Unified client database with full history',
            'Automatic message aggregation',
            'Rate management per client',
            'AI-powered insights',
          ]}
          visual={{
            src: 'https://images.unsplash.com/photo-1682668898065-b90c97684c39?auto=format&fit=crop&q=80&w=1600',
            alt: 'Two people reviewing a project dashboard on a laptop',
            eyebrow: 'Client workspace',
            title: 'A shared view for every relationship',
            detail: 'Meetings, notes, files, and decisions stay attached to the client record.',
            stat: '360',
            statLabel: 'profile view',
            tone: 'rose',
          }}
          imageLeft={true}
        />

        <FeatureShowcase
          title="Invoicing That Sells <span class='text-gray-700'>More Effectively</span>"
          description="Create professional invoices in minutes. Set recurring payments, track who owes what, and get paid faster with automated reminders."
          features={[
            'Create invoices in seconds',
            'Automatic payment reminders',
            'Multi-currency support',
            'Recurring invoice templates',
          ]}
          visual={{
            src: 'https://images.unsplash.com/photo-1654263736203-a289f57c0d82?auto=format&fit=crop&q=80&w=1600',
            alt: 'A payment terminal printing a receipt',
            eyebrow: 'Payment flow',
            title: 'Invoices move cleanly from sent to paid',
            detail: 'Track the handoff from billing to payment without chasing spreadsheets.',
            stat: '2.4x',
            statLabel: 'faster follow-up',
            tone: 'green',
          }}
          animation="slideInLeft"
        />

        <FeatureShowcase
          title="Proposals That Close <span class='text-gray-700'>Deals Faster</span>"
          description="Build professional proposals using pre-built templates. Add your branding, request signatures, and track proposal status automatically."
          features={[
            'Professional proposal templates',
            'Custom branding & styling',
            'Digital signature collection',
            'Real-time proposal tracking',
          ]}
          visual={{
            src: 'https://images.unsplash.com/photo-1746712241490-869f5352b1fb?auto=format&fit=crop&q=80&w=1600',
            alt: 'A laptop displaying a proposal document preview',
            eyebrow: 'Proposal room',
            title: 'Polished scopes ready for a client yes',
            detail: 'Package milestones, proof, and signatures in a focused closing flow.',
            stat: 'Live',
            statLabel: 'deal status',
            tone: 'blue',
          }}
        />

        <CoreFeaturesGrid />

        <TrustSection />

        <PricingSection />

        <CTASection
          email={email}
          setEmail={setEmail}
          submitted={submitted}
          handleEmailSubmit={handleEmailSubmit}
        />

        <Footer />
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
      `}</style>
    </div>
  );
}
