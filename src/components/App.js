import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import SearchBar from './SearchBar';
import MovieResults from './MovieResults';
import Nominations from './Nomination';
import Toaster from './Toaster';
import PopupModal from './PopupModal';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();
let queryMemo = {};

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [nominationIds, setNominationIds] = useState({});
  const [showToaster, setToaster] = useState(false);

  const search = async (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    let searchUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=5f88844d`;

    const response = await searchRequest(searchUrl, searchValue);
    if (response.Response === 'True') {
      //found the movie
      setMovies(response.Search);
      setLoading(false);
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

  const toasterHandler = () => {
    setToaster(!showToaster);
  };

  const nominationHandler = (data, action) => {
    if (action === 'add') {
      if (Object.keys(nominationIds).length < 5) {
        let newNominationId = { [data.imdbID]: data };

        setNominationIds({ ...nominationIds, ...newNominationId });

        if (Object.keys(nominationIds).length === 4) toasterHandler();
      } else {
        toasterHandler();
      }
    } else if (action === 'remove') {
      let copyNominationId = { ...nominationIds };
      delete copyNominationId[data.imdbID];

      setNominationIds({ ...copyNominationId });
    }
  };

  return (
    <div className="App">
      <PopupModal />
      <header className="app-header">
        <div className="icon-img" />
        <h2>Shoppie Awards</h2>
        <div className="icon-img" />
      </header>
      <div className="container">
        <SearchBar search={search} />
        <div className="container-wrapper">
          <MovieResults
            isLoading={isLoading}
            errorMessage={errorMessage}
            movies={movies}
            nominationHandler={nominationHandler}
            nominationIds={nominationIds}
          />
          <Nominations
            nominations={nominationIds}
            movies={movies}
            nominationHandler={nominationHandler}
          ></Nominations>
        </div>
      </div>
      {showToaster && (
        <Toaster
          showToaster={showToaster}
          toasterHandler={toasterHandler}
        ></Toaster>
      )}
    </div>
  );
};

export default App;
