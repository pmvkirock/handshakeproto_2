import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const Store = createStore(
  allReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
