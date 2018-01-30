import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchPosts } from './actions'
import reducers from './reducers';
import { Router } from 'react-router-dom';
import history from './components/history';
import { Provider } from 'react-redux';

const store = createStore(
  combineReducers({
      reducers
    }),
  applyMiddleware(
   thunkMiddleware
 )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
