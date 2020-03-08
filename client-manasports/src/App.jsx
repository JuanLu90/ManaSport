import React, { useEffect } from 'react';
import PlayerRoutes from './routes/PlayerRoutes';
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setUserRedux } from "../src/redux/actions/userActions";

const App = props => {

  const { setUserRedux } = props;
  const history = createBrowserHistory();

  useEffect(() => {
    setUserRedux();
  }, [])

  return (
    <Router history={history}>
      <Route component={PlayerRoutes} />
    </Router>
  );
}

const mapDispatchToProps = {
  setUserRedux
}

export default connect(null, mapDispatchToProps)(App);