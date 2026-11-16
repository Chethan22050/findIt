import React from 'react';
import { PlusCircle, Search, ShieldCheck, HeartHandshake, FileCheck, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const lostSteps = [
    {
      step: '01',
      title: 'Report Your Missing Item',
      description: 'Provide photos, location, approximate date, distinctive details, and an optional reward for recovery.',
      icon: PlusCircle,
      color: 'rose'
    },
    {
      step: '02',
      title: 'Automated Match Alerts',
      description: 'Our system continually checks newly reported found items and notifies you of matching descriptions.',
      icon: Search,
      color: 'brand'
    },
    {
      step: '03',
      title: 'Reunite Safely',
      description: 'Submit an encrypted ownership claim. Once verified by the finder, coordinate safe item return.',
      icon: HeartHandshake,
      color: 'emerald'
    }
  ];

  const foundSteps = [
    {
      step: '01',
      title: 'List the Found Belonging',
      description: 'Upload a clear photograph, note the location where found, and set an optional security question.',
      icon: FileCheck,
      color: 'emerald'
    },
    {
      step: '02',
      title: 'Review Incoming Claims',
      description: 'Community members submit proof of ownership (serial numbers, wallpaper description, receipts).',
      icon: ShieldCheck,
      color: 'brand'
    },
    {
      step: '03',
      title: 'Return to Rightful Owner',
      description: 'Approve the valid claim and arrange a safe public meetup or handover at an official local lost desk.',
      icon: CheckCircle2,
      color: 'sky'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-navy-100 text-navy-800 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            Simple & Transparent Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            How FindIt Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A secure community protocol designed to prevent fraudulent claims while making it effortless to return missing items.
          </p>
        </div>

        {/* Dual Path Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Path A: Lost Something */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900">If You Lost an Item</h3>
                <p className="text-xs text-slate-500">Three easy steps to recover your property</p>
              </div>
            </div>

            <div className="space-y-6">
              {lostSteps.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-subtle">
                    <div className="text-xs font-black text-rose-500 bg-rose-50 px-2.5 py-1.5 rounded-lg h-fit">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Path B: Found Something */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900">If You Found an Item</h3>
                <p className="text-xs text-slate-500">Help a neighbor get their belongings back</p>
              </div>
            </div>

            <div className="space-y-6">
              {foundSteps.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-subtle">
                    <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg h-fit">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
