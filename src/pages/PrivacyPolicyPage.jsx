import React from 'react';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-200">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: November 2026 &bull; FindIt Platform Trust & Safety
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-600" />
              1. Our Core Privacy Philosophy
            </h2>
            <p>
              At FindIt, we prioritize privacy above all else. When you lose or find property, personal details like your home address, exact phone number, and proof identifiers are protected. We never sell your personal data or broker contact lists to third-party marketing services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-600" />
              2. Protected Information & Claim Protocol
            </h2>
            <p>
              When a community member submits a claim on a found item:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-700 pl-2">
              <li>Proof of ownership (e.g. serial numbers, engravings, wallpapers) is sent exclusively to the reporter.</li>
              <li>Phone numbers and personal emails remain encrypted and invisible until the item owner explicitly approves the claim.</li>
              <li>Public listings only display approximate neighborhood or transit location hubs rather than private residences.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600" />
              3. Data Retention & Report Deletion
            </h2>
            <p>
              Once a lost item is marked as "Returned to Owner", all sensitive claim records and identifying images are archived or deleted. Users maintain the right at any time to permanently remove their reports or delete their account through their User Dashboard.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
