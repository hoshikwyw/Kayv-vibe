import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex flex-row items-center justify-between p-2 py-2">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1 text-text-muted focus-within:text-text-primary">
        <label htmlFor="search-field" className="sr-only">
          Search all files
        </label>
        <div className="flex flex-row justify-start items-center">
          <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className="flex-1 bg-transparent border-none placeholder-text-muted outline-none text-base text-text-secondary p-4 shadow-md"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="mr-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Searchbar;