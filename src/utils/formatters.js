// Format dates in readable string: "Oct 24, 2026" or "2 hours ago"
export function formatDate(dateInput) {
  if (!dateInput) return 'N/A';
  
  let date;
  if (dateInput?.toDate && typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return 'N/A';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Relative time: "2 hours ago", "Yesterday", etc.
export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';
  
  let date;
  if (dateInput?.toDate && typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 172800) return 'Yesterday';
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(date);
}

// Category configuration with icons, colors, and badge classes
export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics & Gadgets', icon: 'Laptop', color: 'blue' },
  { id: 'wallets', label: 'Wallets & Purses', icon: 'Wallet', color: 'emerald' },
  { id: 'keys', label: 'Keys & Keychains', icon: 'Key', color: 'amber' },
  { id: 'documents', label: 'IDs & Documents', icon: 'FileText', color: 'purple' },
  { id: 'bags', label: 'Bags & Luggage', icon: 'Briefcase', color: 'indigo' },
  { id: 'jewelry', label: 'Jewelry & Watches', icon: 'Watch', color: 'pink' },
  { id: 'clothing', label: 'Clothing & Apparel', icon: 'Shirt', color: 'teal' },
  { id: 'pets', label: 'Pets & Animals', icon: 'HeartHandshake', color: 'rose' },
  { id: 'accessories', label: 'Glasses & Accessories', icon: 'Glasses', color: 'sky' },
  { id: 'other', label: 'Other Items', icon: 'Package', color: 'slate' },
];

export function getCategoryMeta(categoryId) {
  const found = CATEGORIES.find(c => c.id.toLowerCase() === (categoryId || '').toLowerCase());
  return found || { id: 'other', label: categoryId || 'Other', icon: 'Package', color: 'slate' };
}

// Truncate text nicely
export function truncate(str, maxLength = 80) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + '...';
}
