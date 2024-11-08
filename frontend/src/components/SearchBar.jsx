import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState("");

  function search(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <div className='bar'>
      <div className="search">
        <input
          type="text"
          className="inputbar"
          placeholder="Search"
          onChange={search}
          value={query}
        />
        <button className="search-btn">🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;
