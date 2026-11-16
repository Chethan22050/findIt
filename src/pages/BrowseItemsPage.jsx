import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemFilters from '../components/items/ItemFilters';
import ItemGrid from '../components/items/ItemGrid';
import { getItems } from '../services/itemService';
import { Search, Compass } from 'lucide-react';

export default function BrowseItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'all',
    searchQuery: searchParams.get('q') || '',
    location: searchParams.get('loc') || '',
    status: searchParams.get('status') || 'all',
    sortBy: 'newest'
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL params
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      type: searchParams.get('type') || prev.type,
      category: searchParams.get('category') || prev.category,
      searchQuery: searchParams.get('q') !== null ? searchParams.get('q') : prev.searchQuery,
      location: searchParams.get('loc') !== null ? searchParams.get('loc') : prev.location
    }));
  }, [searchParams]);

  // Fetch filtered items
  useEffect(() => {
    let isMounted = true;
    async function fetchFiltered() {
      setLoading(true);
      try {
        const results = await getItems(filters);
        if (isMounted) setItems(results);
      } catch (err) {
        console.error('Error fetching filtered items:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchFiltered();
    return () => { isMounted = false; };
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));

    // Keep URL in sync
    const nextParams = new URLSearchParams(searchParams);
    if (key === 'searchQuery') {
      if (value) nextParams.set('q', value);
      else nextParams.delete('q');
    } else if (key === 'type') {
      if (value !== 'all') nextParams.set('type', value);
      else nextParams.delete('type');
    } else if (key === 'category') {
      if (value !== 'all') nextParams.set('category', value);
      else nextParams.delete('category');
    } else if (key === 'location') {
      if (value) nextParams.set('loc', value);
      else nextParams.delete('loc');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleReset = () => {
    const defaultFilters = {
      type: 'all',
      category: 'all',
      searchQuery: '',
      location: '',
      status: 'all',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 mb-2">
              <Compass className="w-3.5 h-3.5" />
              Global Directory
            </div>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Browse Lost & Found Items
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Search by description, filter by category, or look up recent reports in your area.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-auto shadow-subtle">
            Showing <strong className="text-navy-900">{items.length}</strong> listings
          </div>
        </div>

        {/* Filter Toolbar */}
        <ItemFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Items Grid */}
        <ItemGrid
          items={items}
          loading={loading}
          emptyTitle="No matching items found"
          emptyDescription="We couldn't find any listings matching your current filter set. Try removing location or category constraints."
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
