import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getItems, 
  getRecentItems, 
  getPlatformStats, 
  createLostItem, 
  createFoundItem,
  updateItem,
  deleteItem as removeItem
} from '../services/itemService';

const ItemContext = createContext(null);

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [recentLost, setRecentLost] = useState([]);
  const [recentFound, setRecentFound] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    lostCount: 0,
    foundCount: 0,
    returnedCount: 0,
    returnRate: 0,
    activeMembers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [allFetched, recents, statMetrics] = await Promise.all([
        getItems({ type: 'all' }),
        getRecentItems(4),
        getPlatformStats()
      ]);

      setItems(allFetched);
      setRecentLost(recents.recentLost);
      setRecentFound(recents.recentFound);
      setStats(statMetrics);
    } catch (err) {
      console.error('Failed to load item context data:', err);
      setError(err.message || 'Failed to load items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const reportLost = async (itemData, user) => {
    const newItem = await createLostItem(itemData, user);
    await refreshData();
    return newItem;
  };

  const reportFound = async (itemData, user) => {
    const newItem = await createFoundItem(itemData, user);
    await refreshData();
    return newItem;
  };

  const editItem = async (id, updates, user) => {
    const success = await updateItem(id, updates, user);
    await refreshData();
    return success;
  };

  const deleteItem = async (id, type, user) => {
    const success = await removeItem(id, type, user);
    await refreshData();
    return success;
  };

  const value = {
    items,
    recentLost,
    recentFound,
    stats,
    loading,
    error,
    refreshData,
    reportLost,
    reportFound,
    editItem,
    deleteItem
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}
