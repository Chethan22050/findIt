import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import RecentItemsSection from '../components/home/RecentItemsSection';
import HowItWorks from '../components/home/HowItWorks';
import StatsSection from '../components/home/StatsSection';
import { ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Recently Reported Items */}
      <RecentItemsSection />

      {/* 3. How FindIt Works */}
      <HowItWorks />

      {/* 4. Live Platform Statistics */}
      <StatsSection />

      {/* 5. Community Call To Action */}
      <section className="py-20 bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-6 border border-white/20">
            <HeartHandshake className="w-8 h-8 text-sky-200" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Reunite a Lost Belonging?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Every minute counts when something goes missing. Join thousands of helpful neighbors, commuters, and travelers making the world a kinder place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/report-lost"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-navy-900 font-extrabold text-sm hover:bg-slate-100 shadow-xl transition-all"
            >
              Report a Lost Item Now
            </Link>
            <Link
              to="/browse"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-500/30 hover:bg-brand-500/40 text-white border border-white/30 font-extrabold text-sm backdrop-blur-sm transition-all"
            >
              Browse Active Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
