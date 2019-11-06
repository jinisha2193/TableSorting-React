import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import PeopleInfo from './components/TableSorting/PeopleInfo';
import ReactRouter from './Router/ReactRouter';
import { Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
    </div>
    <ReactRouter />
  </Router>
);

export default App;
