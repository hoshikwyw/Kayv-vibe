import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-card border-b-2 border-border">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1 min-w-0">
        <div className="flex items-center gap-2 retro-input !py-1.5 !px-2.5 sm:!px-3">
          <FiSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted flex-shrink-0" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className="flex-1 bg-transparent border-none outline-none text-[13px] sm:text-sm text-text-primary placeholder-text-muted font-retro min-w-0"
            placeholder="Search..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <ThemeSwitcher />
      {/* Spacer for mobile hamburger button */}
      <div className="w-8 md:hidden flex-shrink-0" />
    </div>
  );
};

export default Searchbar;
