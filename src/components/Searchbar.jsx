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
    <div className="flex items-center gap-3 px-4 md:px-6 py-2.5 bg-card border-b-2 border-border">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1">
        <div className="flex items-center gap-2.5 retro-input !py-1.5 !px-3">
          <FiSearch className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-muted font-retro"
            placeholder="Search songs, artists..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <ThemeSwitcher />
    </div>
  );
};

export default Searchbar;
