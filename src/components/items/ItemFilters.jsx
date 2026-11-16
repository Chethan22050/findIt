import React from 'react';
import { Search, MapPin, Filter, RotateCcw, Calendar, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../utils/formatters';

export default function ItemFilters({
  filters,
  onFilterChange,
  onReset
}) {
  const { type, category, searchQuery, location, status, sortBy } = filters;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
      {/* Top Row: Search and Type Pills */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Search by item name, model, color, or description..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Type Toggle Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 flex-shrink-0 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => onFilterChange('type', 'all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              type === 'all'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            All Items
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('type', 'lost')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              type === 'lost'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            Lost
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('type', 'found')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              type === 'found'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            Found
          </button>
        </div>
      </div>

      {/* Second Row: Detailed Dropdown Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        
        {/* Category Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              placeholder="City, station, airport..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-navy-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open (Active)</option>
            <option value="claimed">Claimed</option>
            <option value="returned">Returned to Owner</option>
          </select>
        </div>

        {/* Sort Filter & Reset */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Sort Order
          </label>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <button
              type="button"
              onClick={onReset}
              title="Reset all filters"
              className="p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 border border-slate-200 transition-colors flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
