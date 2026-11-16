import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_CLAIMS } from './mockData';
import { updateItem } from './itemService';

const LOCAL_STORAGE_CLAIMS_KEY = 'findit_claims_store';

function getLocalClaims() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CLAIMS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_CLAIMS_KEY, JSON.stringify(INITIAL_CLAIMS));
      return INITIAL_CLAIMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CLAIMS;
  }
}

function saveLocalClaims(claims) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CLAIMS_KEY, JSON.stringify(claims));
  } catch (err) {
    console.error('Failed to save claims locally:', err);
  }
}

/**
 * Submit a claim for an item
 */
export async function submitClaim({
  itemId,
  itemTitle,
  itemType,
  itemOwnerId,
  itemOwnerName,
  message,
  proofDescription,
  contactPhone
}, currentUser) {
  if (!currentUser) {
    throw new Error('You must be signed in to submit a claim.');
  }

  const claimPayload = {
    itemId,
    itemTitle,
    itemType: itemType || 'found',
    itemOwnerId: itemOwnerId || 'system',
    itemOwnerName: itemOwnerName || 'Reporter',
    claimantId: currentUser.uid,
    claimantName: currentUser.displayName || 'Community Member',
    claimantEmail: currentUser.email,
    message: message.trim(),
    proofDescription: proofDescription.trim(),
    contactPhone: contactPhone ? contactPhone.trim() : '',
    status: 'pending', // pending | approved | rejected
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'claims'), claimPayload);
      return { id: docRef.id, ...claimPayload };
    } catch (err) {
      console.error('Firestore submitClaim error:', err);
      throw new Error('Failed to submit claim. Please try again.');
    }
  }

  // Local storage mode
  const claims = getLocalClaims();
  const newClaim = {
    ...claimPayload,
    id: `claim-${Date.now()}`
  };
  claims.unshift(newClaim);
  saveLocalClaims(claims);
  return newClaim;
}

/**
 * Get claims submitted by the current user
 */
export async function getClaimsSubmittedByUser(userId) {
  if (!userId) return [];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'claims'), where('claimantId', '==', userId));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      return list;
    } catch (err) {
      console.warn('Firestore claim query error:', err);
    }
  }

  const all = getLocalClaims();
  return all.filter(c => c.claimantId === userId);
}

/**
 * Get claims received by the item owner for their reported items
 */
export async function getClaimsReceivedByUser(userId) {
  if (!userId) return [];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'claims'), where('itemOwnerId', '==', userId));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      return list;
    } catch (err) {
      console.warn('Firestore claim query error:', err);
    }
  }

  const all = getLocalClaims();
  return all.filter(c => c.itemOwnerId === userId);
}

/**
 * Get all claims for a specific item
 */
export async function getClaimsForItem(itemId) {
  if (!itemId) return [];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'claims'), where('itemId', '==', itemId));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      return list;
    } catch (err) {
      console.warn('Firestore claim query error:', err);
    }
  }

  const all = getLocalClaims();
  return all.filter(c => c.itemId === itemId);
}

/**
 * Update claim status: 'approved' or 'rejected'
 * If approved, marks the corresponding item as 'claimed'
 */
export async function updateClaimStatus(claimId, newStatus, currentUser) {
  if (!['approved', 'rejected', 'pending'].includes(newStatus)) {
    throw new Error('Invalid status.');
  }

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'claims', claimId);
      const claimSnap = await getDoc(docRef);
      if (claimSnap.exists()) {
        const claimData = claimSnap.data();
        await updateDoc(docRef, {
          status: newStatus,
          updatedAt: new Date().toISOString(),
          reviewedBy: currentUser?.uid || 'admin'
        });

        // If approved, update the item's status to claimed
        if (newStatus === 'approved' && claimData.itemId) {
          await updateItem(claimData.itemId, { status: 'claimed' }, currentUser);
        }
        return true;
      }
    } catch (err) {
      console.error('Update claim error in Firestore:', err);
    }
  }

  // Local storage mode
  const claims = getLocalClaims();
  const index = claims.findIndex(c => c.id === claimId);
  if (index !== -1) {
    const claim = claims[index];
    claims[index] = {
      ...claim,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    saveLocalClaims(claims);

    if (newStatus === 'approved' && claim.itemId) {
      updateItem(claim.itemId, { status: 'claimed' }, currentUser);
    }
    return true;
  }
  return false;
}

/**
 * Get all claims for Admin
 */
export async function getAllClaims() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'claims'));
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      return list;
    } catch (err) {
      console.warn('Admin claim fetch error:', err);
    }
  }
  return getLocalClaims();
}
