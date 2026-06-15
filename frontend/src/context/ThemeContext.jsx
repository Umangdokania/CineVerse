import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('cineverse_accent') || 'purple'; // purple or cyan
  });

  const toggleAccent = () => {
    const next = accent === 'purple' ? 'cyan' : 'purple';
    setAccent(next);
    localStorage.setItem('cineverse_accent', next);
  };

  useEffect(() => {
    // Add dark class to document element
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: true, accent, toggleAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
