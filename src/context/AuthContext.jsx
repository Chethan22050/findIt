import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  requestPasswordReset, 
  updateUserProfile,
  subscribeToAuthChanges 
} from '../services/authService';
import { isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const register = async (data) => {
    setAuthError(null);
    try {
      const result = await registerUser(data);
      setCurrentUser(result.user);
      return result;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    setAuthError(null);
    await logoutUser();
    setCurrentUser(null);
  };

  const resetPassword = async (email) => {
    setAuthError(null);
    return await requestPasswordReset(email);
  };

  const updateProfile = async (updates) => {
    if (!currentUser?.uid) return;
    await updateUserProfile(currentUser.uid, updates);
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  // Quick 1-click demo login helper for convenience when testing
  const demoLogin = async (role = 'user') => {
    if (role === 'admin') {
      return login('admin@findit.org', 'findit123');
    }
    return login('alex.wright@example.com', 'findit123');
  };

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email === 'admin@findit.org';

  const value = {
    currentUser,
    isAdmin,
    loading,
    authError,
    isFirebaseConfigured,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    demoLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
