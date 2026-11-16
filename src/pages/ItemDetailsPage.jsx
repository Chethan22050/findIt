import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Lock, 
  Eye, 
  Share2, 
  HeartHandshake, 
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getItemById, findMatchesForItem } from '../services/itemService';
import { TypeBadge, StatusBadge, CategoryBadge } from '../components/common/Badge';
import { formatDate, formatRelativeTime, getCategoryMeta } from '../utils/formatters';
import ClaimModal from '../components/items/ClaimModal';
import ItemCard from '../components/items/ItemCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadItem() {
      setLoading(true);
      try {
        const data = await getItemById(id);
        if (isMounted) {
          setItem(data);
          if (data) {
            setMatchesLoading(true);
            findMatchesForItem(data).then((res) => {
              if (isMounted) {
                setMatches(res.slice(0, 3));
                setMatchesLoading(false);
              }
            });
          }
        }
      } catch (err) {
        console.error('Error loading item:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadItem();
    return () => { isMounted = false; };
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return <LoadingSpinner text="Retrieving item details..." />;
  }

  if (!item) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-12 h-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-navy-900">Listing Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">This report may have been removed or resolved.</p>
        <Link
          to="/browse"
          className="mt-4 px-4 py-2 bg-navy-900 text-white font-bold rounded-xl text-xs hover:bg-navy-800"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  const isOwner = currentUser && currentUser.uid === item.userId;
  const isLost = item.type === 'lost';
  const categoryMeta = getCategoryMeta(item.category);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link & Share */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-subtle transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-subtle transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink ? 'Link Copied!' : 'Share Listing'}
          </button>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-card relative">
              <div className="aspect-[4/3] w-full bg-slate-900 relative">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <p className="text-xs font-semibold">No photograph provided</p>
                  </div>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <TypeBadge type={item.type} />
                  <StatusBadge status={item.status} />
                </div>
              </div>

              {/* Quick metadata strip */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CategoryBadge categoryId={item.category} />
                </div>
                <span>Reported {formatRelativeTime(item.createdAt || item.date)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-card space-y-6">
              
              {/* Title & Reward */}
              <div>
                <h1 className="text-2xl font-extrabold text-navy-900 leading-tight">
                  {item.title}
                </h1>

                {isLost && item.reward && item.reward.trim() && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-navy-950 shadow-sm">
                    <Award className="w-4 h-4" />
                    Offered Reward: {item.reward}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Location & Date Details */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">
                      {isLost ? 'Lost Location' : 'Found Location'}
                    </span>
                    <span className="text-slate-600">{item.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">
                      {isLost ? 'Approximate Date Lost' : 'Date Found'}
                    </span>
                    <span className="text-slate-600">{formatDate(item.date)}</span>
                  </div>
                </div>

                {/* Storage Location if found */}
                {!isLost && item.storageLocation && (
                  <div className="flex items-start gap-3 text-xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-navy-900 block">Current Custody</span>
                      <span className="text-slate-600">{item.storageLocation}</span>
                    </div>
                  </div>
                )}

                {/* Security Verification Question */}
                {!isLost && item.securityQuestion && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      Verification Requirement:
                    </span>
                    <p className="text-amber-800 font-medium">"{item.securityQuestion}"</p>
                  </div>
                )}
              </div>

              {/* Reporter Info (Privacy Protected) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center text-xs">
                    {item.userName ? item.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">{item.userName || 'Member'}</span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-emerald-600" /> Verified Reporter
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Protected Contact
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {isOwner ? (
                  <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-600 font-medium">
                    You reported this item. You can track incoming claims in your{' '}
                    <Link to="/dashboard" className="text-brand-600 font-bold hover:underline">
                      Dashboard
                    </Link>.
                  </div>
                ) : (
                  <div>
                    {currentUser ? (
                      <button
                        type="button"
                        onClick={() => setClaimModalOpen(true)}
                        className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                          isLost
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-navy-900 hover:bg-navy-800 text-white'
                        }`}
                      >
                        <HeartHandshake className="w-4 h-4" />
                        {isLost ? 'I Found This Item (Contact Owner)' : 'Claim This Item (Submit Proof)'}
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        state={{ from: { pathname: `/items/${item.id}` } }}
                        className="w-full py-3.5 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Sign In to Claim This Item
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Smart Community Matches Section */}
        {matches.length > 0 && (
          <div className="pt-10 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h3 className="text-xl font-bold text-navy-900">
                Potential Community Matches
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((m) => (
                <ItemCard key={m.id} item={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Claim Submission Modal */}
      {claimModalOpen && (
        <ClaimModal
          item={item}
          onClose={() => setClaimModalOpen(false)}
          onSuccess={() => {
            // Callback
          }}
        />
      )}
    </div>
  );
}
