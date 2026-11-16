import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X, 
  HelpCircle,
  LayoutDashboard,
  Sparkles,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, isAdmin, logout, demoLogin, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-400 p-0.5 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-navy-900">
                  Find<span className="text-brand-600">It</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
                  Community
                </span>
              </div>
              <p className="hidden md:block text-[11px] font-medium text-slate-500 -mt-0.5 tracking-wide">
                Lost Today. Found Tomorrow.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/browse"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                isActive('/browse')
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              <Search className="w-4 h-4 text-brand-600" />
              Browse Listings
            </Link>

            <Link
              to="/report-lost"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                isActive('/report-lost')
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Lost Something?
            </Link>

            <Link
              to="/report-found"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                isActive('/report-found')
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50'
              }`}
            >
              Found Something?
            </Link>

            <Link
              to="/#how-it-works"
              onClick={(e) => {
                if (location.pathname === '/') {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-navy-900 hover:bg-slate-100/70 transition-colors"
            >
              How It Works
            </Link>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 bg-white hover:border-slate-300 shadow-sm focus:outline-none transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-200">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left text-xs">
                    <span className="block font-bold text-navy-900 max-w-[110px] truncate">
                      {currentUser.displayName || 'Member'}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {isAdmin ? 'Admin' : 'Member'}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-navy-900 truncate">{currentUser.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-600" />
                      My Dashboard & Claims
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      to="/report-lost"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Report Lost Item
                    </Link>

                    <Link
                      to="/report-found"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Report Found Item
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-navy-900 hover:text-brand-600 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-sm hover:shadow transition-all"
                >
                  Get Started
                </Link>

                {/* Quick 1-click preview login for effortless testing */}
                <button
                  type="button"
                  onClick={() => demoLogin('admin')}
                  title="Test Admin Access instantly"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200/80 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  Quick Demo
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
          >
            <Search className="w-5 h-5 text-brand-600" />
            Browse Listings
          </Link>

          <Link
            to="/report-lost"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-rose-600 font-semibold hover:bg-rose-50"
          >
            <PlusCircle className="w-5 h-5" />
            Report Lost Item
          </Link>

          <Link
            to="/report-found"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-emerald-600 font-semibold hover:bg-emerald-50"
          >
            <PlusCircle className="w-5 h-5" />
            Report Found Item
          </Link>

          {currentUser ? (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="px-3 py-1">
                <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-navy-900">{currentUser.displayName || currentUser.email}</p>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
              >
                <LayoutDashboard className="w-5 h-5 text-brand-600" />
                User Dashboard
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-amber-700 font-semibold hover:bg-amber-50"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 text-left"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-bold text-navy-900 border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-bold bg-navy-900 text-white rounded-xl hover:bg-navy-800"
              >
                Register
              </Link>
              <button
                type="button"
                onClick={() => {
                  demoLogin('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-brand-700 bg-brand-50 rounded-lg border border-brand-200"
              >
                Quick Demo Login (Admin)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
