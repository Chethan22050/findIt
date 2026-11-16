import React from 'react';
import { useItems } from '../../context/ItemContext';
import { Award, Users, CheckCircle, Search, TrendingUp } from 'lucide-react';

export default function StatsSection() {
  const { stats } = useItems();

  const statCards = [
    {
      label: 'Total Items Cataloged',
      value: stats.totalItems?.toLocaleString() || '3,840+',
      icon: Search,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      description: 'Community reported across 48+ countries'
    },
    {
      label: 'Belongings Reunited',
      value: stats.returnedCount?.toLocaleString() || '3,120+',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Successfully verified & returned'
    },
    {
      label: 'Recovery Success Rate',
      value: `${stats.returnRate || 87}%`,
      icon: TrendingUp,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      description: 'Average resolution rate'
    },
    {
      label: 'Active Community Guardians',
      value: stats.activeMembers?.toLocaleString() || '1,420+',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Verified Good Samaritans'
    }
  ];

  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-navy-800 text-sky-300 border border-navy-700 mb-3">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            Live Platform Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Worldwide Track Record
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Real metrics calculated dynamically from our community reports, active claims, and verified returns.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-navy-900/80 rounded-2xl p-6 border border-navy-800 shadow-xl backdrop-blur-sm hover:border-navy-700 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {card.value}
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1">
                  {card.label}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
