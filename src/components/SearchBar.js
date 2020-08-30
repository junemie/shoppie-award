import React, { useState, Component } from 'react';
import axios from 'axios';
const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    let searchWords = e.target.value;
    setSearchValue(searchWords);
    props.search(searchWords);
  };
  return (
    <label className="search-label" htmlFor="search-input">
      <input
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        type="text"
      />
    </label>
  );
};

export default SearchBar;
