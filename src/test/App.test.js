import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { mount } from 'enzyme';
import App from '../App';
import { MovieResults, Nominations } from '../components';
import { movies, nominationIds, nominations } from './testData';

/**
 * The enzyme adapter "adapts" its functions to the specific version of React
 * you are using (in our current case, react 16). This is necessary as breaking
 * changes in React's internal implementations (which enzyme utilizes) may be
 * introduced with each major version.
 */
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders MoviesResult if there is searched movie', () => {
    const wrapper = mount(
      <MovieResults movies={movies} nominationIds={nominationIds} />
    );
    expect(wrapper.find(MovieResults)).to.have.length(1);
  });

  it('renders single Nominations if there is selected nomination', () => {
    const wrapper = mount(<Nominations nominations={nominations} />);
    expect(wrapper.find(Nominations)).to.have.lengthOf(1);
  });
});
