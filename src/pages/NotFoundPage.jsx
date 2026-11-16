import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-5 shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-200">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-navy-900">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The page you are looking for seems to have been lost! But don't worry, we're experts at finding things.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/browse"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-navy-900 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  );
}
