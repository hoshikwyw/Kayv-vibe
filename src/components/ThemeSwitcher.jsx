import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

const ThemeSwitcher = () => {
  const { currentTheme, themeNames, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-text-primary"
        aria-label="Change theme"
      >
        <HiOutlineColorSwatch className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-secondary/95 backdrop-blur-lg rounded-lg shadow-xl z-50 border border-background-tertiary">
            <div className="p-3 border-b border-background-tertiary flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Themes</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2">
              {themeNames.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => {
                    changeTheme(theme.key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors mb-1 ${
                    currentTheme === theme.key
                      ? 'bg-accent/20 text-accent font-semibold'
                      : 'text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                  }`}
                >
                  {theme.name}
                  {currentTheme === theme.key && (
                    <span className="ml-2 text-accent">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;


