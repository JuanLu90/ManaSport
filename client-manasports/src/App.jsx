import React, { useEffect } from 'react';
import PlayerRoutes from './routes/PlayerRoutes';
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setUserAction } from "../src/redux/actions/userActions";

const App = props => {

  const { setUserAction } = props;
  const history = createBrowserHistory();

  useEffect(() => {
    setUserAction();
  }, []);

  return (
    <Router history={history}>
      <Route component={PlayerRoutes} />
    </Router>
  );
}

const mapDispatchToProps = {
  setUserAction
}

export default connect(null, mapDispatchToProps)(App);