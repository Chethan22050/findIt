import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  AlertTriangle, 
  Trash2, 
  CheckCircle, 
  Search, 
  ExternalLink,
  Lock,
  Activity,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { getItems, deleteItem, updateItem } from '../services/itemService';
import { getAllClaims, updateClaimStatus } from '../services/claimService';
import { StatusBadge, CategoryBadge, TypeBadge } from '../components/common/Badge';
import { formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function AdminDashboardPage() {
  const { currentUser, isAdmin } = useAuth();
  const { stats, refreshData } = useItems();

  const [activeTab, setActiveTab] = useState('reports'); // 'reports' | 'claims' | 'users'
  const [allItems, setAllItems] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [itemsList, claimsList] = await Promise.all([
        getItems({ type: 'all' }),
        getAllClaims()
      ]);
      setAllItems(itemsList);
      setAllClaims(claimsList);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleDeleteListing = async (id, type) => {
    if (window.confirm('ADMIN ACTION: Permanently remove this listing from the platform?')) {
      await deleteItem(id, type, currentUser);
      await refreshData();
      loadAdminData();
    }
  };

  const handleResolveClaim = async (claimId, newStatus) => {
    await updateClaimStatus(claimId, newStatus, currentUser);
    await refreshData();
    loadAdminData();
  };

  // Security Gate
  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-200 p-8 text-center space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Restricted Admin Portal</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Admin access is securely provisioned and restricted to authorized platform moderators. Public users cannot register as administrators.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800"
            >
              Sign In with Authorized Admin Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter items by search term
  const filteredItems = allItems.filter(item => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.userEmail?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              Verified Administrator Console
            </div>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Platform Administration & Moderation
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Oversee community reports, resolve dispute claims, and maintain trust & safety.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Admin Session Active
            </span>
          </div>
        </div>

        {/* Global Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Reports</p>
            <h3 className="text-2xl font-black text-navy-900 mt-1">{allItems.length}</h3>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
            <p className="text-xs font-bold text-slate-400 uppercase">Claims Filed</p>
            <h3 className="text-2xl font-black text-brand-600 mt-1">{allClaims.length}</h3>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
            <p className="text-xs font-bold text-slate-400 uppercase">Resolved Rate</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{stats.returnRate || 87}%</h3>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
            <p className="text-xs font-bold text-slate-400 uppercase">Network Users</p>
            <h3 className="text-2xl font-black text-purple-600 mt-1">{stats.activeMembers || 1420}</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reports'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            Manage Listings ({allItems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'claims'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Manage Claims ({allClaims.length})
          </button>
        </div>

        {/* Tab 1: Listings Moderation */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            
            {/* Search filter for moderation */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by title, location, or reporter..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {loading ? (
              <LoadingSpinner text="Loading listings for moderation..." />
            ) : (
              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-card">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Item & Reporter</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/60">
                        <td className="py-3.5 px-4">
                          <div>
                            <Link
                              to={`/items/${item.id}`}
                              className="font-bold text-navy-900 hover:text-brand-600 block text-xs"
                            >
                              {item.title}
                            </Link>
                            <span className="text-[11px] text-slate-400">
                              By: {item.userName || item.userEmail || 'Member'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <TypeBadge type={item.type} />
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {item.location}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {formatDate(item.date)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/items/${item.id}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteListing(item.id, item.type)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Remove Fraudulent / Inappropriate Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Claims Moderation */}
        {activeTab === 'claims' && (
          <div className="space-y-4">
            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-card">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Claimed Item</th>
                    <th className="py-3 px-4">Claimant</th>
                    <th className="py-3 px-4">Proof Description</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allClaims.map(claim => (
                    <tr key={claim.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-bold text-navy-900">
                        {claim.itemTitle}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-semibold text-slate-800">{claim.claimantName}</span>
                          <span className="text-[11px] text-slate-400 block">{claim.claimantEmail}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                        {claim.proofDescription}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={claim.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {claim.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleResolveClaim(claim.id, 'approved')}
                                className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => handleResolveClaim(claim.id, 'rejected')}
                                className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px]"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
