import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = '';

const Nominations = ({ nominations }) => {
  console.log(nominations);
  return (
    <div className="nominations">
      <h3>Results</h3>
      {nominations.length !== 0 && (
        <table>
          <tbody>
            {nominations.map((nomination, i) => {
              return (
                <tr className={`findResult ${i % 2 ? 'even' : 'odd'}`} key={i}>
                  <td className="primary-photo">
                    {nomination.Poster === 'N/A' ? (
                      <div className="no-image">No Image</div>
                    ) : (
                      <img src={nomination.Poster}></img>
                    )}
                  </td>
                  <td className="result-text">
                    <p>
                      {nomination.Title} ({nomination.Year})
                    </p>
                    <button className="nominate" onClick={() => {}}>
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

export default Nominations;
