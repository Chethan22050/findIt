import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, CheckCircle2, Eye, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { StatusBadge, CategoryBadge, TypeBadge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export default function ItemListTable({
  items = [],
  onStatusChange,
  onDelete,
  emptyMessage = 'No items found'
}) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-card">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
            <th className="py-3.5 px-4">Item Details</th>
            <th className="py-3.5 px-4">Category</th>
            <th className="py-3.5 px-4">Location & Date</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              {/* Item Info */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                        No photo
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 max-w-xs">
                    <Link
                      to={`/items/${item.id}`}
                      className="font-bold text-navy-900 hover:text-brand-600 truncate block text-sm transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {item.description}
                    </span>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <CategoryBadge categoryId={item.category} />
              </td>

              {/* Location & Date */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate max-w-[140px]">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    to={`/items/${item.id}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-slate-100 transition-colors"
                    title="View Item Page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {item.status === 'open' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(item.id, 'returned', item.type)}
                      className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      title="Mark as Returned / Resolved"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDelete(item.id, item.type)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
