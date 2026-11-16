// Rich sample dataset for Lost & Found items, claims, and statistics
// Used for immediate demonstration, initial seed, and fallback when live Firebase keys are pending configuration.

export const INITIAL_LOST_ITEMS = [
  {
    id: 'lost-1',
    type: 'lost',
    title: 'MacBook Pro 14" Space Gray in Navy Sleeve',
    category: 'electronics',
    description: 'Left on the wooden bench near Starbucks at Grand Central Terminal. It has an orange sticker of a mountain range on the lid and a discreet initials engraving "KTU" on the bottom chassis.',
    location: 'Grand Central Terminal, New York, NY',
    date: '2026-11-14',
    createdAt: new Date('2026-11-14T14:30:00Z').toISOString(),
    status: 'open',
    reward: '$150',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-1',
    userName: 'Alexander Wright',
    userEmail: 'alex.wright@example.com',
    contactPreference: 'email',
    viewsCount: 142
  },
  {
    id: 'lost-2',
    type: 'lost',
    title: 'Golden Retriever Pup (Answers to "Milo")',
    category: 'pets',
    description: 'Milo slipped out of his teal collar near the playground area at Hyde Park. Friendly, chipped, loves squeaky toys. Wearing a red rabies tag.',
    location: 'Hyde Park, London, UK',
    date: '2026-11-15',
    createdAt: new Date('2026-11-15T11:00:00Z').toISOString(),
    status: 'open',
    reward: '$300',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-2',
    userName: 'Sophie Chen',
    userEmail: 'sophie.chen@example.com',
    contactPreference: 'phone',
    viewsCount: 389
  },
  {
    id: 'lost-3',
    type: 'lost',
    title: 'Brown Leather Bellroy Bi-Fold Wallet',
    category: 'wallets',
    description: 'Lost on Metro Line 1 between Châtelet and Concorde. Contains student ID, driver license, and transit pass. Keep the cash, just need the documents!',
    location: 'Paris Metro Line 1, France',
    date: '2026-11-13',
    createdAt: new Date('2026-11-13T18:45:00Z').toISOString(),
    status: 'open',
    reward: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-3',
    userName: 'Julien Moreau',
    userEmail: 'julien.m@example.com',
    contactPreference: 'email',
    viewsCount: 96
  },
  {
    id: 'lost-4',
    type: 'lost',
    title: 'Vintage Omega Seamaster Automatic Watch',
    category: 'jewelry',
    description: 'Silver dial with worn brown leather strap. Family heirloom lost during an outdoor wedding reception in the garden terrace.',
    location: 'Botanical Gardens, Melbourne, Australia',
    date: '2026-11-12',
    createdAt: new Date('2026-11-12T20:15:00Z').toISOString(),
    status: 'claimed',
    reward: '$500',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-4',
    userName: 'David Miller',
    userEmail: 'david.m@example.com',
    contactPreference: 'email',
    viewsCount: 220
  }
];

export const INITIAL_FOUND_ITEMS = [
  {
    id: 'found-1',
    type: 'found',
    title: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'electronics',
    description: 'Found inside a black hardshell case left on the seat in the quiet carriage of the express train to Kyoto. Has a small keychain attached to the zipper.',
    location: 'Kyoto Station Platform 3, Japan',
    date: '2026-11-15',
    createdAt: new Date('2026-11-15T09:20:00Z').toISOString(),
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-5',
    userName: 'Kenji Sato',
    userEmail: 'kenji.s@example.com',
    securityQuestion: 'What unique item or keychain is hooked onto the travel case zipper?',
    storageLocation: 'Held safely with the Station Master Office',
    viewsCount: 167
  },
  {
    id: 'found-2',
    type: 'found',
    title: 'Set of 4 Brass Keys with Toyota Fob & Swiss Army Tool',
    category: 'keys',
    description: 'Found resting on the outdoor café counter after lunch rush. One house key has a blue rubber cap.',
    location: 'Piazza del Duomo, Milan, Italy',
    date: '2026-11-14',
    createdAt: new Date('2026-11-14T13:10:00Z').toISOString(),
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-6',
    userName: 'Elena Rossi',
    userEmail: 'elena.rossi@example.com',
    securityQuestion: 'What color is the Swiss Army pocket tool attached to the ring?',
    storageLocation: 'Safely kept at Duomo Café front desk',
    viewsCount: 114
  },
  {
    id: 'found-3',
    type: 'found',
    title: 'Herschel Little America Backpack (Forest Green)',
    category: 'bags',
    description: 'Found on the seating benches at Vancouver International Airport Domestic arrivals gate 24. Heavy, holds textbooks and a spiral notebook.',
    location: 'Vancouver International Airport (YVR), Canada',
    date: '2026-11-13',
    createdAt: new Date('2026-11-13T16:00:00Z').toISOString(),
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-7',
    userName: 'Marcus Tremblay',
    userEmail: 'marcus.t@example.com',
    securityQuestion: 'What subject name is handwritten on the cover of the main spiral notebook?',
    storageLocation: 'YVR Airport Lost and Found desk',
    viewsCount: 203
  },
  {
    id: 'found-4',
    type: 'found',
    title: 'Designer Ray-Ban Aviator Sunglasses in Gold Frame',
    category: 'accessories',
    description: 'Found on the sandy promenade near lifeguard tower 4. Prescription polarized lenses, excellent condition with brown case.',
    location: 'Santa Monica Beach, California, USA',
    date: '2026-11-11',
    createdAt: new Date('2026-11-11T17:30:00Z').toISOString(),
    status: 'returned',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    userId: 'user-demo-8',
    userName: 'Claire Foster',
    userEmail: 'claire.f@example.com',
    securityQuestion: 'Describe the cleaning cloth color inside the case.',
    storageLocation: 'Safely returned to owner!',
    viewsCount: 312
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-1',
    itemId: 'found-1',
    itemTitle: 'Sony WH-1000XM5 Noise Canceling Headphones',
    itemType: 'found',
    claimantId: 'user-claimant-1',
    claimantName: 'Sarah Jenkins',
    claimantEmail: 'sarah.j@example.com',
    itemOwnerId: 'user-demo-5',
    itemOwnerName: 'Kenji Sato',
    message: 'Hello Kenji, these are my headphones! I was traveling from Kyoto on the noon Shinkansen.',
    proofDescription: 'The zipper has a miniature wooden Torii gate charm purchased at Fushimi Inari with "Sarah" in katakana written on the back edge.',
    status: 'pending', // pending | approved | rejected
    createdAt: new Date('2026-11-15T15:00:00Z').toISOString(),
    contactPhone: '+1 (555) 234-5678'
  },
  {
    id: 'claim-2',
    itemId: 'found-4',
    itemTitle: 'Designer Ray-Ban Aviator Sunglasses in Gold Frame',
    itemType: 'found',
    claimantId: 'user-demo-4',
    claimantName: 'David Miller',
    claimantEmail: 'david.m@example.com',
    itemOwnerId: 'user-demo-8',
    itemOwnerName: 'Claire Foster',
    message: 'I dropped these right next to the lifeguard tower while packing up our volleyball net.',
    proofDescription: 'The inside cleaning cloth is dark grey microfiber with a custom optometrist logo "Venice Visionary".',
    status: 'approved',
    createdAt: new Date('2026-11-12T10:15:00Z').toISOString(),
    contactPhone: '+1 (555) 876-5432'
  }
];

export const INITIAL_USERS = [
  {
    uid: 'admin-findit-001',
    email: 'admin@findit.org',
    displayName: 'FindIt Global Admin',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
    itemsCount: 0,
    claimsCount: 0
  },
  {
    uid: 'user-demo-1',
    email: 'alex.wright@example.com',
    displayName: 'Alexander Wright',
    role: 'user',
    createdAt: '2026-08-10T00:00:00Z',
    itemsCount: 1,
    claimsCount: 0
  }
];
