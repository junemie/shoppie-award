import React, { useState } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import MovieResults from './MovieResults';
import Nominations from './Nomination';
import Toaster from './Toaster';
import PopupModal from './PopupModal';
import {fetchData} from '../services/movies'

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [nominationIds, setNominationIds] = useState({});
  const [showToaster, setToaster] = useState(false);

  /**
   * Sends the search value to the API
   * @param {*} searchValue string
   */

  const search = async (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    const response = await fetchData(searchValue);

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

  const toasterHandler = () => {
    setToaster(!showToaster);
  };

  /**
   * Function adds/deletes movie from nomination
   * @param {*} data object
   * @param {*} action string
   */

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
