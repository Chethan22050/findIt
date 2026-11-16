import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Mail, 
  Phone, 
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export default function ClaimsManager({
  claimsReceived = [],
  claimsSubmitted = [],
  onUpdateStatus,
  loading
}) {
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'submitted'

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'received'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Incoming Claims on My Items ({claimsReceived.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('submitted')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'submitted'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          My Outgoing Claims ({claimsSubmitted.length})
        </button>
      </div>

      {/* Tab 1: Claims Received (Owner review) */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {claimsReceived.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-navy-900">No incoming claims</p>
              <p className="text-xs text-slate-500 mt-1">
                When someone claims an item you reported, you can review their ownership proof here.
              </p>
            </div>
          ) : (
            claimsReceived.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Claim for item:
                    </span>
                    <h4 className="text-base font-bold text-navy-900">{claim.itemTitle}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={claim.status} />
                    <span className="text-xs text-slate-400">{formatDate(claim.createdAt)}</span>
                  </div>
                </div>

                {/* Proof & message */}
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                    <span className="font-bold text-navy-900 block mb-1">
                      Submitted Proof of Ownership:
                    </span>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {claim.proofDescription}
                    </p>
                  </div>

                  <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100">
                    <span className="font-bold text-brand-950 block mb-1">
                      Message from Claimant ({claim.claimantName}):
                    </span>
                    <p className="text-brand-900 leading-relaxed">
                      "{claim.message}"
                    </p>
                  </div>
                </div>

                {/* Claimant Protected Info: revealed only if approved */}
                {claim.status === 'approved' ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                      <Unlock className="w-4 h-4 text-emerald-600" />
                      Claim Approved &mdash; Claimant Contact Details Revealed:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Email: <strong>{claim.claimantEmail}</strong></span>
                      </div>
                      {claim.contactPhone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Phone: <strong>{claim.contactPhone}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-2.5 rounded-xl">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Claimant private contact info is hidden until you approve this claim.</span>
                  </div>
                )}

                {/* Owner Actions */}
                {claim.status === 'pending' && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(claim.id, 'rejected')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject Claim
                    </button>

                    <button
                      type="button"
                      onClick={() => onUpdateStatus(claim.id, 'approved')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve & Reveal Contact
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Claims Submitted (My Claims) */}
      {activeTab === 'submitted' && (
        <div className="space-y-4">
          {claimsSubmitted.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-navy-900">No submitted claims</p>
              <p className="text-xs text-slate-500 mt-1">
                You haven't submitted any ownership claims yet. Browse found items to submit a claim.
              </p>
            </div>
          ) : (
            claimsSubmitted.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-navy-900">{claim.itemTitle}</h4>
                  <StatusBadge status={claim.status} />
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="font-semibold text-slate-700 block mb-1">Your proof of ownership:</span>
                  <p>{claim.proofDescription}</p>
                </div>

                {claim.status === 'approved' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                    <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Congratulations! Your claim was approved by the reporter.
                    </p>
                    <p className="mt-1">
                      Check your email ({claim.claimantEmail}) for safe exchange and pickup instructions.
                    </p>
                  </div>
                )}

                {claim.status === 'rejected' && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
                    <p className="font-bold flex items-center gap-1.5 text-rose-800">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Claim was not approved by the reporter.
                    </p>
                    <p className="mt-1">
                      The provided proof details did not match the item specifications.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
