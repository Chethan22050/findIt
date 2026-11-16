import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Upload, 
  X, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { uploadImage } from '../services/storageService';
import { CATEGORIES } from '../utils/formatters';
import { validateItemReport, validateImageFile } from '../utils/validation';

export default function ReportLostPage() {
  const { currentUser } = useAuth();
  const { reportLost } = useItems();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    reward: '',
    contactPreference: 'email'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationErr = validateImageFile(file);
    if (validationErr) {
      setErrors(prev => ({ ...prev, image: validationErr }));
      return;
    }

    setErrors(prev => ({ ...prev, image: null }));
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const validation = validateItemReport(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);

      let imageUrl = '';
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile, `items/${currentUser?.uid || 'guest'}`);
      }

      const itemPayload = {
        ...formData,
        imageUrl: imageUrl || ''
      };

      const created = await reportLost(itemPayload, currentUser);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/items/${created.id}`);
      }, 1500);
    } catch (err) {
      setApiError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Sign in Required</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please log in or create an account to file an official lost property report so we can notify you of matches.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              state={{ from: { pathname: '/report-lost' } }}
              className="w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800"
            >
              Sign In to Continue
            </Link>
            <Link
              to="/register"
              className="w-full py-3 rounded-xl bg-slate-100 text-navy-900 font-bold text-xs hover:bg-slate-200"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Lost Item Registration
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Report a Missing Belonging
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Provide detailed identifying information so community members can verify and return your property.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card">
          
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Report Published!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your report has been broadcast to the community network. Redirecting you to the item listing page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {apiError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Item Title */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Item Name / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Space Gray 14-inch MacBook Pro or Brown Leather Bellroy Wallet"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                    errors.title ? 'border-rose-400' : 'border-slate-200'
                  } rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`}
                />
                {errors.title && <p className="text-[11px] text-rose-600 mt-1">{errors.title}</p>}
              </div>

              {/* Category & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                      errors.category ? 'border-rose-400' : 'border-slate-200'
                    } rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`}
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-[11px] text-rose-600 mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Date Lost <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Location Lost <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Central Park West Bench, NY or Heathrow Terminal 2 Baggage Claim"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border ${
                      errors.location ? 'border-rose-400' : 'border-slate-200'
                    } rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`}
                  />
                </div>
                {errors.location && <p className="text-[11px] text-rose-600 mt-1">{errors.location}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Detailed Description & Identifying Marks <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe color, brand, stickers, unique scratches, contents, or circumstances where it went missing..."
                  className={`w-full p-3.5 bg-slate-50 border ${
                    errors.description ? 'border-rose-400' : 'border-slate-200'
                  } rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`}
                />
                {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
              </div>

              {/* Reward & Contact Preference Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Offered Reward (Optional)
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="reward"
                      value={formData.reward}
                      onChange={handleChange}
                      placeholder="e.g. $100 or Coffee & Gratitude"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Contact Preference
                  </label>
                  <select
                    name="contactPreference"
                    value={formData.contactPreference}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    <option value="email">Community In-App Email Claim</option>
                    <option value="phone">Phone / SMS (revealed only upon approval)</option>
                  </select>
                </div>
              </div>

              {/* Photograph Upload */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Upload Item Photograph (Optional but highly recommended)
                </label>
                
                {imagePreview ? (
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-navy-900/80 text-white hover:bg-rose-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-brand-500 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                    <Upload className="w-8 h-8 text-brand-600 mb-2" />
                    <span className="font-bold text-navy-900">Click to browse or drop an image</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, or WEBP up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
                {errors.image && <p className="text-[11px] text-rose-600 mt-1">{errors.image}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/browse')}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting Report...' : 'Publish Lost Item Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
