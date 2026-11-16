import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Award, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { TypeBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import { formatDate, formatRelativeTime } from '../../utils/formatters';

export default function ItemCard({ item }) {
  if (!item) return null;

  const isLost = item.type === 'lost';
  const hasReward = isLost && item.reward && item.reward.trim();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-hover hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image Thumbnail with Overlay Badges */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
            <span className="text-xs font-semibold">No Photo Available</span>
          </div>
        )}

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <TypeBadge type={item.type} />
          <StatusBadge status={item.status} />
        </div>

        {/* Bottom overlay: Reward or Security info */}
        {hasReward && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-500 text-navy-950 shadow-md">
            <Award className="w-3.5 h-3.5" />
            Reward: {item.reward}
          </div>
        )}

        {!isLost && item.securityQuestion && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-navy-900/90 text-sky-300 backdrop-blur-sm shadow-md">
            <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
            Proof Required
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Relative Time */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <CategoryBadge categoryId={item.category} />
            <span className="font-medium text-slate-400">{formatRelativeTime(item.createdAt || item.date)}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-navy-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Card Footer: Location, Date & Action */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{formatDate(item.date)}</span>
            </div>

            <Link
              to={`/items/${item.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 transition-colors group-hover:translate-x-0.5 duration-200"
            >
              View Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
