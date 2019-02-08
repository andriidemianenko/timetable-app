import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './storage/reducers'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {}
const middleWare = [thunk]
const store = createStore(rootReducer, initialState, 
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
