import React from 'react';

const Nominations = (props) => {
  const { nominations, nominationHandler } = props;

  return (
    <div className="nominations-wrapper">
      <h3>Nominations</h3>
      {nominations && (
        <table>
          <tbody>
            {Object.values(nominations).map((movie, i) => {
              const title =
                movie.Title.length > 24
                  ? `${movie.Title.slice(0, 24)}...`
                  : movie.Title;

              return (
                nominations[movie.imdbID] && (
                  <tr
                    className={`findResult ${i % 2 ? 'even' : 'odd'}`}
                    key={i}
                  >
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
                        className="remove-bttn"
                        onClick={() => {
                          nominationHandler(movie, 'remove');
                        }}
                      >
                        <span className="close">&times;</span>
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Nominations;
