import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUserData } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cineverse_user');
    return saved ? JSON.parse(saved) : mockUserData.currentUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cineverse_auth') === 'true';
  });

  const login = (email, password) => {
    // Basic mock auth
    setIsAuthenticated(true);
    localStorage.setItem('cineverse_auth', 'true');
    // Save current user template
    localStorage.setItem('cineverse_user', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cineverse_auth');
  };

  const updateWatchlist = (movieId, category, action) => {
    const updatedUser = { ...user };
    const list = updatedUser.watchlist[category] || [];

    if (action === 'add') {
      if (!list.includes(movieId)) {
        list.push(movieId);
      }
    } else if (action === 'remove') {
      updatedUser.watchlist[category] = list.filter(id => id !== movieId);
    }
    
    setUser(updatedUser);
    localStorage.setItem('cineverse_user', JSON.stringify(updatedUser));
  };

  const addReview = (movieId, review) => {
    // Reviews are tracked in AuthContext so they persist across tabs locally
    const updatedUser = { ...user };
    updatedUser.stats.reviewsWritten += 1;
    setUser(updatedUser);
    localStorage.setItem('cineverse_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateWatchlist, addReview }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
