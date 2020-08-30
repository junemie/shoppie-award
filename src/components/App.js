import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import SearchBar from './SearchBar';
import MovieResults from './MovieResults';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();
let queryMemo = {};

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const cancelToken = useRef(null);
  //search method
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
      if (response.Error === 'Incorrect IMDb ID') {
        setErrorMessage(response.Error);
        setLoading(false);
      } else {
        setErrorMessage(response.Error);
        setMovies([]);
        setLoading(false);
      }
    }
  };

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
  // console.log('error', errorMessage);
  return (
    <div className="App">
      {console.log('error', errorMessage)}
      <header className="app-header">
        <h2>Shoppie Awards</h2>
      </header>
      <div className="container">
        <SearchBar search={search} />
        <div className="movies">
          {isLoading && !errorMessage ? (
            <span>Loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, i) => (
              <MovieResults key={`${i}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
