import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import ItemCard from '../items/ItemCard';
import { useItems } from '../../context/ItemContext';
import LoadingSpinner from '../common/LoadingSpinner';

export default function RecentItemsSection() {
  const { recentLost, recentFound, loading } = useItems();
  const [activeTab, setActiveTab] = useState('lost');

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 mb-2">
              <Search className="w-3.5 h-3.5" />
              Community Bulletin
            </div>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Recently Reported Belongings
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Check real-time community reports from around your neighborhood or transit hub.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('lost')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'lost'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Lost Items ({recentLost.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('found')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'found'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Found Items ({recentFound.length})
              </button>
            </div>

            <Link
              to={`/browse?type=${activeTab}`}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 px-3 py-2"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Item Cards Grid */}
        {loading ? (
          <LoadingSpinner text="Fetching recent community listings..." />
        ) : (
          <div>
            {activeTab === 'lost' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentLost.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentFound.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to={`/browse?type=${activeTab}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-navy-900 hover:bg-slate-50 shadow-sm"
          >
            <span>View All {activeTab === 'lost' ? 'Lost' : 'Found'} Items</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
