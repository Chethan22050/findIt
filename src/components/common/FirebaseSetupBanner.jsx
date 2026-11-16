import React, { useState } from 'react';
import { Database, CheckCircle2, AlertTriangle, X, Copy, ExternalLink } from 'lucide-react';
import { isFirebaseConfigured } from '../../services/firebase';

export default function FirebaseSetupBanner() {
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  const envSnippet = `VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isFirebaseConfigured) {
    return null; // Silent when fully configured
  }

  if (dismissed) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-brand-950 text-white px-4 py-2.5 text-xs shadow-sm border-b border-navy-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <AlertTriangle className="w-3 h-3 text-amber-300" />
              Demo Mode Active
            </span>
            <p className="truncate text-slate-300 font-medium">
              Firebase keys not detected in <code className="bg-navy-950 px-1 py-0.5 rounded text-sky-300 font-mono">.env</code>. All features, mock reports & claims are fully testable in browser storage.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-2.5 py-1 rounded bg-brand-500 hover:bg-brand-600 text-white font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
              <Database className="w-3 h-3" />
              Firebase Setup Guide
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900">How to Connect Firebase to FindIt</h3>
                  <p className="text-xs text-slate-500">Step-by-step instructions to enable live Cloud Firestore & Storage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-navy-900 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm text-slate-600">
              {/* Step 1 */}
              <div>
                <h4 className="font-bold text-navy-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Create a Firebase Project
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-brand-600 font-semibold inline-flex items-center gap-0.5 hover:underline">Firebase Console <ExternalLink className="w-3 h-3" /></a>, click <strong>"Add Project"</strong>, and name it <strong>FindIt</strong>.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <h4 className="font-bold text-navy-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Enable Firebase Services
                </h4>
                <ul className="mt-1 space-y-1 text-xs text-slate-600 list-disc list-inside">
                  <li><strong>Authentication:</strong> Go to Build &rarr; Authentication &rarr; Sign-in method &rarr; Enable <strong>Email/Password</strong>.</li>
                  <li><strong>Firestore Database:</strong> Go to Build &rarr; Firestore Database &rarr; Create database (Test Mode or Production).</li>
                  <li><strong>Storage:</strong> Go to Build &rarr; Storage &rarr; Get Started.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Add Web App & Copy Keys into <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-brand-700">.env</code>
                  </h4>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy template'}
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Register a Web App (&lt;/&gt;) under Project Settings, then create a <code className="font-mono bg-slate-100 px-1 rounded">.env</code> file in the project root:
                </p>
                <div className="mt-2 bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                  <pre>{envSnippet}</pre>
                </div>
              </div>

              {/* Security Rules */}
              <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900">
                <p className="font-bold mb-1">Security Rules Included:</p>
                <p>Ready-to-deploy security rules have already been generated for you in <code className="font-semibold text-brand-800">firestore.rules</code> and <code className="font-semibold text-brand-800">storage.rules</code> in the project root.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-navy-900 text-white font-bold hover:bg-navy-800 text-sm transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
