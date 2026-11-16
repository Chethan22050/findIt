import React from 'react';
import ItemCard from './ItemCard';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ItemGrid({
  items,
  loading,
  emptyTitle,
  emptyDescription,
  onReset
}) {
  if (loading) {
    return <LoadingSpinner text="Searching community listings..." />;
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No listings found'}
        description={emptyDescription || 'No items matched your current search and filter settings. Try broadening your criteria.'}
        actionText={onReset ? 'Reset Filters' : undefined}
        onActionClick={onReset}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
