import React, { useState } from 'react';
import _ from 'lodash';

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState({})

  const handleChange = (e) => {
    e.preventDefault();
    let searchWords = e.target.value;
    setSearchValue(searchWords);

    const search = _.debounce(props.search, 300);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if(searchWords) {
      search(searchWords);
    }
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
