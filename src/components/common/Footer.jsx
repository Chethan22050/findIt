import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Shield, Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Compass className="w-5 h-5 text-sky-200" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Find<span className="text-brand-400">It</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              The worldwide community-powered lost and found network. Reconnecting people with their lost belongings through smart reporting, verified matching, and honest community members.
            </p>
            <p className="text-xs text-brand-300 font-semibold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Lost Today. Found Tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  All Listings
                </Link>
              </li>
              <li>
                <Link to="/browse?type=lost" className="hover:text-white transition-colors">
                  Lost Items
                </Link>
              </li>
              <li>
                <Link to="/browse?type=found" className="hover:text-white transition-colors">
                  Found Items
                </Link>
              </li>
              <li>
                <Link to="/report-lost" className="text-rose-400 hover:text-rose-300 transition-colors">
                  Report Lost Belonging
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Report Found Belonging
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Community */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Claim Verification Guide</span>
              </li>
              <li>
                <span className="text-slate-400">Safe Exchange Guidelines</span>
              </li>
              <li>
                <span className="text-slate-400">Fraud Prevention</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:support@findit.org" className="hover:text-white transition-colors">
                  support@findit.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Worldwide 24/7 Assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Encrypted & Verified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} FindIt Platform Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for communities everywhere</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
