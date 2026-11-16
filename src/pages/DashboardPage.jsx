import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  User, 
  PlusCircle, 
  HeartHandshake
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { getUserItems, findMatchesForItem, updateItem, deleteItem } from '../services/itemService';
import { 
  getClaimsReceivedByUser, 
  getClaimsSubmittedByUser, 
  updateClaimStatus 
} from '../services/claimService';
import StatOverview from '../components/dashboard/StatOverview';
import ItemListTable from '../components/dashboard/ItemListTable';
import ClaimsManager from '../components/dashboard/ClaimsManager';
import MatchesSection from '../components/dashboard/MatchesSection';
import ProfileEditor from '../components/dashboard/ProfileEditor';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { refreshData } = useItems();

  const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'found' | 'claims' | 'matches' | 'profile'
  const [userLostItems, setUserLostItems] = useState([]);
  const [userFoundItems, setUserFoundItems] = useState([]);
  const [claimsReceived, setClaimsReceived] = useState([]);
  const [claimsSubmitted, setClaimsSubmitted] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    if (!currentUser?.uid) return;
    try {
      setLoading(true);
      const [itemsData, received, submitted] = await Promise.all([
        getUserItems(currentUser.uid),
        getClaimsReceivedByUser(currentUser.uid),
        getClaimsSubmittedByUser(currentUser.uid)
      ]);

      setUserLostItems(itemsData.lost || []);
      setUserFoundItems(itemsData.found || []);
      setClaimsReceived(received || []);
      setClaimsSubmitted(submitted || []);

      // Find matches for user's lost items
      if (itemsData.lost && itemsData.lost.length > 0) {
        const matchPromises = itemsData.lost.map(lostItem => findMatchesForItem(lostItem));
        const allMatches = await Promise.all(matchPromises);
        const flattened = allMatches.flat();
        // Deduplicate
        const uniqueMatches = Array.from(new Map(flattened.map(m => [m.id, m])).values());
        setMatches(uniqueMatches);
      } else {
        setMatches([]);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const handleStatusChange = async (itemId, newStatus, type) => {
    await updateItem(itemId, { status: newStatus }, currentUser);
    await refreshData();
    loadDashboardData();
  };

  const handleDeleteItem = async (itemId, type) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteItem(itemId, type, currentUser);
      await refreshData();
      loadDashboardData();
    }
  };

  const handleClaimStatusUpdate = async (claimId, newStatus) => {
    await updateClaimStatus(claimId, newStatus, currentUser);
    await refreshData();
    loadDashboardData();
  };

  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-slate-500">Please sign in to view your dashboard.</p>
          <Link
            to="/login"
            className="inline-block px-5 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-bold"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Member Hub
            </div>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Welcome back, {currentUser.displayName || 'Neighbor'}!
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your lost and found listings, track claims, and monitor automatic community matches.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Link
              to="/report-lost"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <HeartHandshake className="w-4 h-4" />
              Report Found
            </Link>
          </div>
        </div>

        {/* Dynamic Stat Summary Cards */}
        <StatOverview
          lostCount={userLostItems.length}
          foundCount={userFoundItems.length}
          claimsReceivedCount={claimsReceived.length}
          claimsSubmittedCount={claimsSubmitted.length}
          matchCount={matches.length}
        />

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('lost')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lost'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-rose-400" />
            My Lost Items ({userLostItems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('found')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'found'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            My Found Items ({userFoundItems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'claims'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            Claims System ({claimsReceived.length + claimsSubmitted.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'matches'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Smart Matches ({matches.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            Profile Settings
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <LoadingSpinner text="Syncing your dashboard data..." />
        ) : (
          <div>
            {activeTab === 'lost' && (
              <ItemListTable
                items={userLostItems}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteItem}
                emptyMessage="You haven't reported any missing items yet. Click 'Report Lost' above to create a listing."
              />
            )}

            {activeTab === 'found' && (
              <ItemListTable
                items={userFoundItems}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteItem}
                emptyMessage="You haven't reported any found belongings yet. Help the community by listing items you discover."
              />
            )}

            {activeTab === 'claims' && (
              <ClaimsManager
                claimsReceived={claimsReceived}
                claimsSubmitted={claimsSubmitted}
                onUpdateStatus={handleClaimStatusUpdate}
                loading={loading}
              />
            )}

            {activeTab === 'matches' && (
              <MatchesSection
                matches={matches}
                loading={loading}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileEditor />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
