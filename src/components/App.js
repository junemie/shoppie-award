import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchBar from './SearchBar';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  //search method
  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    let searchUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=5f88844d`;

    //Debounce API Call for Searching...
    let timeout = null;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      fetch(searchUrl)
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (jsonResponse.Response === 'True') {
            console.log('hi', jsonResponse);
          } else {
            setErrorMessage(jsonResponse.Error);
            setLoading(false);
          }
        });
    }, 200);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h2>Shoppie Awards</h2>
      </header>
      <div className="container">
        <SearchBar search={search} />
      </div>
    </div>
  );
};

export default App;
