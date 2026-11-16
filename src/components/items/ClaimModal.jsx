import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, CheckCircle2, Lock, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitClaim } from '../../services/claimService';

export default function ClaimModal({ item, onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const [proofDescription, setProofDescription] = useState('');
  const [message, setMessage] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!proofDescription.trim() || proofDescription.trim().length < 15) {
      setError('Please provide specific details to prove ownership (minimum 15 characters), such as serial numbers, lock codes, unique marks, wallpaper description, or purchase details.');
      return;
    }

    if (!message.trim()) {
      setError('Please write a brief polite message to the person who reported this item.');
      return;
    }

    try {
      setLoading(true);
      await submitClaim({
        itemId: item.id,
        itemTitle: item.title,
        itemType: item.type,
        itemOwnerId: item.userId,
        itemOwnerName: item.userName,
        message,
        proofDescription,
        contactPhone
      }, currentUser);

      setSuccess(true);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900">
                {item.type === 'found' ? 'Claim Found Item' : 'I Found This Lost Item'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm truncate">
                Item: <span className="font-semibold text-slate-700">{item.title}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-navy-900 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-navy-900">Claim Submitted Successfully!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The reporter (<strong>{item.userName || 'Finder'}</strong>) has been notified. When they verify your proof of ownership, they will approve the claim and contact details will be securely exchanged.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-navy-800 transition-colors shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Security Question Reminder if found item has one */}
            {item.securityQuestion && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      Verification Question from Finder:
                    </h5>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">
                      "{item.securityQuestion}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Proof of Ownership */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Proof of Ownership / Distinctive Identifiers <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={proofDescription}
                onChange={(e) => setProofDescription(e.target.value)}
                placeholder="Mention unique features known only to the true owner (e.g., scratches, stickers, screen lock wallpaper, exact contents, receipt info, serial number)..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                This information is protected and sent only to the item reporter to protect your privacy.
              </p>
            </div>

            {/* Message to Reporter */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Personal Message to Reporter <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hello, I believe this is my lost item. Let's arrange a safe public handover..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Contact Phone (Optional) */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Your Phone Number <span className="text-slate-400 font-normal">(Optional for SMS coordination)</span>
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Privacy Protection notice */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200/60">
              <Lock className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              <span>Your email and phone are securely hidden until the reporter formally approves this claim.</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Claim...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Verification Claim
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
