import React from 'react';
import { getCategoryMeta } from '../../utils/formatters';

export function TypeBadge({ type }) {
  const isLost = type === 'lost';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
        isLost
          ? 'bg-rose-50 text-rose-700 border border-rose-200'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isLost ? 'bg-rose-500' : 'bg-emerald-500'}`}
      />
      {isLost ? 'Lost Item' : 'Found Item'}
    </span>
  );
}

export function StatusBadge({ status }) {
  switch (status?.toLowerCase()) {
    case 'open':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          Open
        </span>
      );
    case 'claimed':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Claimed
        </span>
      );
    case 'returned':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Returned to Owner
        </span>
      );
    case 'approved':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
          Rejected
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Pending Review
        </span>
      );
  }
}

export function CategoryBadge({ categoryId }) {
  const meta = getCategoryMeta(categoryId);
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
      {meta.label}
    </span>
  );
}
