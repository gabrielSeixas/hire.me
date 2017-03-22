import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import Async from './middlewares/async';
import reducers from './reducers';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);;

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,  
  document.getElementById('root')
);
