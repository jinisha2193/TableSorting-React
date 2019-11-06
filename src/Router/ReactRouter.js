import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import PeopleInfo from '../components/TableSorting/PeopleInfo';

const ReactRouter = () => (
  <>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route path='/User'>
      <PeopleInfo />
    </Route>
  </>
);

export default ReactRouter;
