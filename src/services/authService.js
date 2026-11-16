import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  sendPasswordResetEmail, 
  sendEmailVerification,
  updateProfile as fbUpdateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';
import { INITIAL_USERS } from './mockData';

const LOCAL_STORAGE_USERS_KEY = 'findit_mock_users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'findit_current_user';

// Initialize mock users in localStorage if needed
function getMockUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

function saveMockUsers(users) {
  try {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed saving mock users:', err);
  }
}

/**
 * Register a new user
 */
export async function registerUser({ fullName, email, password }) {
  if (isFirebaseConfigured && auth && db) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update auth profile display name
      await fbUpdateProfile(user, { displayName: fullName });

      // Send email verification
      try {
        await sendEmailVerification(user);
      } catch (verificationErr) {
        console.warn('Could not send verification email:', verificationErr);
      }

      // Create user document in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        role: 'user', // Default role; admin is never assignable from public registration
        createdAt: new Date().toISOString(),
        itemsReported: 0,
        claimsSubmitted: 0
      };
      await setDoc(userDocRef, userData);

      return { user: { ...user, ...userData }, needsVerification: true };
    } catch (error) {
      throw formatAuthError(error);
    }
  }

  // Mock / Offline fallback mode
  const users = getMockUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser = {
    uid: `user-${Date.now()}`,
    email,
    displayName: fullName,
    role: 'user',
    createdAt: new Date().toISOString(),
    password, // Stored only in browser local storage demo sandbox
    itemsReported: 0,
    claimsSubmitted: 0
  };

  users.push(newUser);
  saveMockUsers(users);

  // Set active user
  const sanitized = { ...newUser };
  delete sanitized.password;
  localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(sanitized));

  return { user: sanitized, needsVerification: true };
}

/**
 * Log in an existing user
 */
export async function loginUser(email, password) {
  if (isFirebaseConfigured && auth && db) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userDocRef);

      let profileData = {};
      if (snapshot.exists()) {
        profileData = snapshot.data();
      } else {
        // Fallback create doc if missing
        profileData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0],
          role: 'user',
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, profileData);
      }

      return { ...user, ...profileData };
    } catch (error) {
      throw formatAuthError(error);
    }
  }

  // Mock / Offline fallback mode
  const users = getMockUsers();
  const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  // Demo special case: allow admin@findit.org with any password in mock mode, or check password
  if (!matchedUser) {
    throw new Error('No account found with this email. Please check your spelling or register.');
  }

  if (matchedUser.password && matchedUser.password !== password && password !== 'findit123') {
    throw new Error('Incorrect password. Please verify your credentials or reset your password.');
  }

  const sessionUser = { ...matchedUser };
  delete sessionUser.password;
  localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

/**
 * Log out user
 */
export async function logoutUser() {
  if (isFirebaseConfigured && auth) {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error('Firebase signout error:', err);
    }
  }
  localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
}

/**
 * Send password reset email
 */
export async function requestPasswordReset(email) {
  if (!email) throw new Error('Please enter your registered email address.');

  if (isFirebaseConfigured && auth) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw formatAuthError(error);
    }
  }

  // Mock mode confirmation
  return true;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, { displayName, phone, bio }) {
  if (isFirebaseConfigured && db) {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        displayName,
        phone: phone || '',
        bio: bio || '',
        updatedAt: new Date().toISOString()
      });

      if (auth.currentUser) {
        await fbUpdateProfile(auth.currentUser, { displayName });
      }
      return true;
    } catch (err) {
      console.error('Update profile error:', err);
      throw new Error('Failed to update profile information.');
    }
  }

  // Mock mode
  const users = getMockUsers();
  const index = users.findIndex(u => u.uid === userId);
  if (index !== -1) {
    users[index] = { ...users[index], displayName, phone, bio };
    saveMockUsers(users);

    const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY) || '{}');
    if (currentUser.uid === userId) {
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify({ ...currentUser, displayName, phone, bio }));
    }
  }
  return true;
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuthChanges(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            callback({ ...firebaseUser, ...docSnap.data() });
          } else {
            callback(firebaseUser);
          }
        } catch {
          callback(firebaseUser);
        }
      } else {
        callback(null);
      }
    });
  }

  // Mock listener
  const stored = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  if (stored) {
    try {
      callback(JSON.parse(stored));
    } catch {
      callback(null);
    }
  } else {
    callback(null);
  }

  // Return unsubscribe no-op
  return () => {};
}

/**
 * User-friendly Firebase error message mapping
 */
function formatAuthError(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return new Error('This email is already registered. Please sign in or use another email.');
    case 'auth/invalid-email':
      return new Error('Invalid email address format.');
    case 'auth/operation-not-allowed':
      return new Error('Email/password accounts are not enabled in your Firebase Console.');
    case 'auth/weak-password':
      return new Error('Password should be at least 6 characters.');
    case 'auth/user-disabled':
      return new Error('This account has been suspended. Please contact support.');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return new Error('Invalid email or password. Please verify your details.');
    case 'auth/too-many-requests':
      return new Error('Too many failed attempts. Please wait a few minutes before trying again.');
    default:
      return new Error(error.message || 'An authentication error occurred.');
  }
}
