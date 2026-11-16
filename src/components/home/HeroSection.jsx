import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Sparkles, Shield, HeartHandshake, Compass } from 'lucide-react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Subtle decorative background circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-20 w-80 h-80 bg-sky-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-subtle mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
          <span className="text-xs font-bold text-navy-900 tracking-wide">
            FindIt Platform &bull; <span className="text-brand-600">Lost Today. Found Tomorrow.</span>
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-tight">
          Lost Something? <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-sky-600">
            Let's Find It Together.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The global community network to report missing items, register found belongings, verify ownership with encrypted claims, and safely reunite people with what matters most.
        </p>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="p-1.5 sm:p-2 bg-white rounded-2xl shadow-hover border border-slate-200 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 text-brand-600" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lost or found items (e.g., iPhone 15, black cat, leather wallet, keys)..."
              className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base text-navy-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Filter Pill Suggestions */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {['MacBook', 'Car Keys', 'Wallet', 'Golden Retriever', 'Backpack', 'Passports'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/browse?q=${encodeURIComponent(tag)}`)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors font-medium border border-slate-200/60"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Two Prominent Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/report-lost"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-lg shadow-rose-600/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            <span>I Lost Something</span>
          </Link>

          <Link
            to="/report-found"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>I Found Something</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/70 flex items-center justify-center text-brand-600 flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-900">Global Reach</h4>
              <p className="text-[11px] text-slate-500">Airports, transits, parks & cities worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-900">Protected Claims</h4>
              <p className="text-[11px] text-slate-500">Ownership verification & contact masking</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-sky-600 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-900">Smart Matchmaking</h4>
              <p className="text-[11px] text-slate-500">Automated matches between lost & found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
