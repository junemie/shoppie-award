import React from 'react';

const MovieResults = (props) => {
  const {
    movies,
    nominationHandler,
    nominationIds,
    isLoading,
    errorMessage,
  } = props;

  return (
    <div className="results-wrapper">
      <h3>Results</h3>
      {isLoading && !errorMessage ? (
        <span>Loading...</span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <table>
          <tbody>
            {movies.map((movie, i) => {
              const title =
                movie.Title.length > 66
                  ? `${movie.Title.slice(0, 66)}...`
                  : movie.Title;

              const isDisabled = nominationIds[movie.imdbID] ? true : false;
              return (
                <tr className={`findResult ${i % 2 ? 'even' : 'odd'}`} key={i}>
                  <td className="primary-photo">
                    {movie.Poster === 'N/A' ? (
                      <div className="no-image">No Image</div>
                    ) : (
                      <img src={movie.Poster} alt="movie poster"></img>
                    )}
                  </td>
                  <td className="result-text">
                    <p>
                      {title} ({movie.Year})
                    </p>
                    <button
                      className="nominate-bttn"
                      disabled={isDisabled}
                      onClick={() => {
                        nominationHandler(movie, 'add');
                      }}
                    >
                      Nominate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovieResults;
