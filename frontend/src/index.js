import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { Router } from 'react-router-dom';
import history from './components/history';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  reducers,
  form: formReducer
})


const store = createStore(
  rootReducer,
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
