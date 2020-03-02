import React from 'react';
import PlayerRoutes from './routes/PlayerRoutes';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const App = () => {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
       <Route component={PlayerRoutes} />
    </Router>
  );
}

export default App;