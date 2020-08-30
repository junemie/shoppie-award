import React from 'react';
const DEFAULT_PLACEHOLDER_IMAGE = require('../noImage.jpg');

const MovieResults = (props) => {
  const { movies, addNomination } = props;
  return (
    <table>
      <tbody>
        {movies.map((movie, i) => {
          return (
            <tr className={`findResult ${i % 2 ? 'even' : 'odd'}`} key={i}>
              <td className="primary-photo">
                {movie.Poster === 'N/A' ? (
                  <div className="no-image">No Image</div>
                ) : (
                  <img src={movie.Poster}></img>
                )}
              </td>
              <td className="result-text">
                <p>
                  {movie.Title} ({movie.Year})
                </p>
                <button
                  className="nominate"
                  onClick={() => {
                    addNomination(movie, 'add');
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
  );
};

export default MovieResults;
