import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Header = () => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ width: '40%' }}>
      <Link data-testid={'homeLink'} to='/'>
        Home
      </Link>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '60%'
      }}
    >
      <div>
        <Link data-testid={'userProfileLink'} to='/User'>
          Show User Profiles
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
