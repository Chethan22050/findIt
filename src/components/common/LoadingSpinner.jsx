import React from 'react';
import { Compass } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading FindIt data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center animate-spin">
          <Compass className="w-7 h-7 text-brand-600" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500 animate-pulse">{text}</p>
    </div>
  );
}
