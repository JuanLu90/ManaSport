import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

// STYLES
import 'bootstrap/dist/css/bootstrap.min.css';

// RESET CSS
import './reset.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
      <App history={history} />
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
