import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers} from 'redux';
import reducers from './reducers';
import { Router } from 'react-router-dom';
import history from './components/history';
import { Provider } from 'react-redux';

const store = createStore(
  combineReducers({
      reducers
    })
)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
