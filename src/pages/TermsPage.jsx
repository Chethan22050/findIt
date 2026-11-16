import React from 'react';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-200">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Terms of Service & Community Guidelines
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            FindIt Platform &bull; Tagline: "Lost Today. Found Tomorrow."
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600" />
              1. Community Code of Conduct
            </h2>
            <p>
              FindIt is built upon honesty, civic responsibility, and mutual respect. Members agree to only post accurate reports of actual lost or found possessions. Submitting falsified claims or attempting to misappropriate someone else's property constitutes fraudulent conduct and will result in immediate termination and referral to law enforcement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              2. Safe Exchange Guidelines
            </h2>
            <p>
              When returning an item in person, users must follow our Safe Exchange Protocol:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-700 pl-2">
              <li>Always meet in a well-lit, public location (e.g. police station lobby, transit information counter, busy café).</li>
              <li>Never wire funds, pay courier fees in advance, or accept suspicious third-party escrow checks.</li>
              <li>Offer and receipt of rewards is strictly an agreement between the finder and the owner; FindIt does not charge transaction commissions on rewards.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
