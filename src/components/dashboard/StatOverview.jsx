import React from 'react';
import { AlertCircle, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function StatOverview({
  lostCount = 0,
  foundCount = 0,
  claimsReceivedCount = 0,
  claimsSubmittedCount = 0,
  matchCount = 0
}) {
  const cards = [
    {
      label: 'My Lost Reports',
      count: lostCount,
      icon: AlertCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100'
    },
    {
      label: 'My Found Reports',
      count: foundCount,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      label: 'Claims Received',
      count: claimsReceivedCount,
      icon: ShieldCheck,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      borderColor: 'border-brand-100'
    },
    {
      label: 'Potential Matches',
      count: matchCount,
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-white border ${card.borderColor} shadow-card flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-semibold text-slate-500">{card.label}</p>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
                {card.count}
              </h4>
            </div>
            <div className={`w-11 h-11 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
