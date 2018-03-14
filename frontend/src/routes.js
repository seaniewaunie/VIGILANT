import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Header from './Header';
import Visual from './Visualization'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='visualization' component={Visual}} />
    <Route path='*' component={Home} />
  </Route>
);