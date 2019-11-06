import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header';

describe('Header', () => {
  it('should render the component', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Header />
      </Router>
    );
  });
  it('should go to userProfile Page when User Profile button is clicked', () => {
    const history = createMemoryHistory();
    const { container, getByTestId } = render(
      <Router history={history}>
        <App>
          <Header />
        </App>
      </Router>
    );
    expect(container.innerHTML).toMatch('Home!!');
    const userProfileLink = getByTestId('userProfileLink');

    fireEvent.click(userProfileLink);
    expect(container.innerHTML).toContain('User Profile');
  });
  it('should go to home Page when Home button is clicked', async () => {
    const history = createMemoryHistory();
    const { container, getByTestId } = render(
      <Router history={history}>
        <App>
          <Header />
        </App>
      </Router>
    );

    const homeLink = getByTestId('homeLink');

    fireEvent.click(homeLink);
    expect(container.innerHTML).toContain('Home!!');
  });
});
