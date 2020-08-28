import React, { useState } from 'react';

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    props.search(searchValue);
  };

  const resetInputField = () => {
    setSearchValue('');
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
