import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { CategoryBadge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export default function MatchesSection({ matches = [], loading }) {
  if (loading) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        Finding potential matches across recent reports...
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-navy-900">No Potential Matches Right Now</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          When another member reports an item in the same category or matching keywords as your missing belongings, it will appear here instantly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <h4 className="text-sm font-bold text-purple-950">
              Smart Community Matches Found! ({matches.length})
            </h4>
            <p className="text-xs text-purple-800">
              These newly reported found belongings closely match your missing item reports.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card flex gap-4 hover:border-purple-300 transition-all"
          >
            <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
              {match.imageUrl ? (
                <img
                  src={match.imageUrl}
                  alt={match.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <CategoryBadge categoryId={match.category} />
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                    {match.matchScore || 85}% Match
                  </span>
                </div>

                <h5 className="font-bold text-navy-900 text-sm truncate">
                  {match.title}
                </h5>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {match.location}
                  </span>
                  <span>&bull;</span>
                  <span>{formatDate(match.date)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  to={`/items/${match.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  Verify & Claim
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
