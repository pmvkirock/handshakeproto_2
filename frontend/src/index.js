import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

axios.defaults.baseURL =
  'http://ec2-3-16-187-247.us-east-2.compute.amazonaws.com:8000';

const Store = createStore(
  allReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
