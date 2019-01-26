import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { CookiesProvider } from 'react-cookie';

import App from './components/App.js';
import rootReducer from  './redux/reducers'

//let store = createStore(rootReducer);

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(rootReducer)


ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
