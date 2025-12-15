import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  default: {
    name: 'Default Green',
    colors: {
      '--color-primary': '#94A684',
      '--color-primary-light': '#AEC3AE',
      '--color-primary-dark': '#839983',
      '--color-secondary': '#839983',
      '--color-secondary-light': '#859e85',
      '--color-secondary-dark': '#6b7a6b',
      '--color-accent': '#8cf38c',
      '--color-accent-hover': '#6dd16d',
      '--color-background': '#94A684',
      '--color-background-secondary': '#839983',
      '--color-background-tertiary': '#859e8583',
      '--color-text-primary': '#FFEEF4',
      '--color-text-secondary': '#ffffff',
      '--color-text-muted': '#fffc',
      '--color-card': '#4c426e',
      '--color-card-hover': '#5a4f7a',
    },
  },
  dark: {
    name: 'Dark Mode',
    colors: {
      '--color-primary': '#1a1a2e',
      '--color-primary-light': '#16213e',
      '--color-primary-dark': '#0f0f1e',
      '--color-secondary': '#16213e',
      '--color-secondary-light': '#1e2a47',
      '--color-secondary-dark': '#0d1520',
      '--color-accent': '#00d4ff',
      '--color-accent-hover': '#00b8e6',
      '--color-background': '#1a1a2e',
      '--color-background-secondary': '#16213e',
      '--color-background-tertiary': '#1e2a47',
      '--color-text-primary': '#ffffff',
      '--color-text-secondary': '#e0e0e0',
      '--color-text-muted': '#b0b0b0',
      '--color-card': '#16213e',
      '--color-card-hover': '#1e2a47',
    },
  },
  purple: {
    name: 'Purple Dream',
    colors: {
      '--color-primary': '#6b46c1',
      '--color-primary-light': '#8b5cf6',
      '--color-primary-dark': '#553c9a',
      '--color-secondary': '#7c3aed',
      '--color-secondary-light': '#a78bfa',
      '--color-secondary-dark': '#5b21b6',
      '--color-accent': '#c084fc',
      '--color-accent-hover': '#a855f7',
      '--color-background': '#6b46c1',
      '--color-background-secondary': '#7c3aed',
      '--color-background-tertiary': '#8b5cf6',
      '--color-text-primary': '#faf5ff',
      '--color-text-secondary': '#ffffff',
      '--color-text-muted': '#e9d5ff',
      '--color-card': '#4c426e',
      '--color-card-hover': '#5a4f7a',
    },
  },
  ocean: {
    name: 'Ocean Blue',
    colors: {
      '--color-primary': '#0ea5e9',
      '--color-primary-light': '#38bdf8',
      '--color-primary-dark': '#0284c7',
      '--color-secondary': '#0369a1',
      '--color-secondary-light': '#0c4a6e',
      '--color-secondary-dark': '#075985',
      '--color-accent': '#22d3ee',
      '--color-accent-hover': '#06b6d4',
      '--color-background': '#0ea5e9',
      '--color-background-secondary': '#0369a1',
      '--color-background-tertiary': '#0c4a6e',
      '--color-text-primary': '#f0f9ff',
      '--color-text-secondary': '#ffffff',
      '--color-text-muted': '#bae6fd',
      '--color-card': '#075985',
      '--color-card-hover': '#0c4a6e',
    },
  },
  sunset: {
    name: 'Sunset Orange',
    colors: {
      '--color-primary': '#f97316',
      '--color-primary-light': '#fb923c',
      '--color-primary-dark': '#ea580c',
      '--color-secondary': '#c2410c',
      '--color-secondary-light': '#ea580c',
      '--color-secondary-dark': '#9a3412',
      '--color-accent': '#fdba74',
      '--color-accent-hover': '#fb923c',
      '--color-background': '#f97316',
      '--color-background-secondary': '#c2410c',
      '--color-background-tertiary': '#ea580c',
      '--color-text-primary': '#fff7ed',
      '--color-text-secondary': '#ffffff',
      '--color-text-muted': '#ffedd5',
      '--color-card': '#c2410c',
      '--color-card-hover': '#ea580c',
    },
  },
  vintage: {
    name: 'Vintage',
    colors: {
      '--color-primary': '#8B6F47',
      '--color-primary-light': '#A68B5F',
      '--color-primary-dark': '#6B5435',
      '--color-secondary': '#6B5435',
      '--color-secondary-light': '#7D6342',
      '--color-secondary-dark': '#4F3D28',
      '--color-accent': '#C9A961',
      '--color-accent-hover': '#B8964F',
      '--color-background': '#F5E6D3',
      '--color-background-secondary': '#E8D5B7',
      '--color-background-tertiary': '#D4C4A8',
      '--color-text-primary': '#3D2817',
      '--color-text-secondary': '#2A1A0F',
      '--color-text-muted': '#5C3E2A',
      '--color-card': '#D4C4A8',
      '--color-card-hover': '#C9B89A',
    },
  },
  macos: {
    name: 'macOS',
    colors: {
      '--color-primary': '#007AFF',
      '--color-primary-light': '#5AC8FA',
      '--color-primary-dark': '#0051D5',
      '--color-secondary': '#8E8E93',
      '--color-secondary-light': '#AEAEB2',
      '--color-secondary-dark': '#636366',
      '--color-accent': '#007AFF',
      '--color-accent-hover': '#0051D5',
      '--color-background': '#F5F5F7',
      '--color-background-secondary': '#FFFFFF',
      '--color-background-tertiary': '#E5E5EA',
      '--color-text-primary': '#1D1D1F',
      '--color-text-secondary': '#000000',
      '--color-text-muted': '#6E6E73',
      '--color-card': '#FFFFFF',
      '--color-card-hover': '#F5F5F7',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'default';
  });

  useEffect(() => {
    const theme = themes[currentTheme];
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    themes: Object.keys(themes),
    themeNames: Object.entries(themes).map(([key, value]) => ({
      key,
      name: value.name,
    })),
    changeTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


