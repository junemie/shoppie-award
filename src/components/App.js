import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import SearchBar from './SearchBar';
import MovieResults from './MovieResults';
import Nominations from './Nomination';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();
let queryMemo = {};

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [nominationMovies, setNominationMovies] = useState([]);
  const [nominationIds, setNominationIds] = useState(new Set());

  const search = async (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    let searchUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=5f88844d`;

    const response = await searchRequest(searchUrl, searchValue);
    if (response.Response === 'True') {
      //found the movie
      setMovies(response.Search);
      setLoading(false);
      console.log('success', response);
    } else {
      //handle error
      if (
        response.Error === 'Incorrect IMDb ID.' ||
        response.Error === 'Too many results.'
      ) {
        setErrorMessage('');
      } else {
        setErrorMessage(response.Error);
      }
      setLoading(false);
      setMovies([]);
    }
  };

  //API Request
  const searchRequest = async (searchUrl, searchValue) => {
    //Cancel prev request
    source && source.cancel('Operation canceled due to new request.');
    // Create a new CancelToken
    source = axios.CancelToken.source();
    try {
      if (queryMemo[searchValue]) {
        return queryMemo[searchValue];
      }
      let res = await axios.get(searchUrl, {
        cancelToken: source.token,
      });
      const result = res.data;
      // Store response
      queryMemo[searchValue] = result;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        return error.message;
      } else {
        // Handle usual errors
        return 'Please try again';
      }
    }
  };

  const addNomination = (data, action) => {
    if (action === 'add') {
      console.log(nominationMovies, data, 'nomination');
      let updatedNomination = [...nominationMovies, data];
      console.log('update ==>', updatedNomination);
      setNominationMovies(updatedNomination);
    }
  };

  return (
    <div className="App">
      {console.log('error', errorMessage)}
      <header className="app-header">
        <h2>Shoppie Awards</h2>
      </header>
      <div className="container">
        <SearchBar search={search} />
        <div className="results-container">
          <div className="results-wrapper">
            <h3>Results</h3>
            {isLoading && !errorMessage ? (
              <span>Loading...</span>
            ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : (
              <MovieResults movies={movies} addNomination={addNomination} />
            )}
          </div>
          <Nominations nominations={nominationMovies}></Nominations>
        </div>
      </div>
    </div>
  );
};

export default App;
