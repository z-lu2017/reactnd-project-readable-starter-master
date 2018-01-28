import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore} from 'redux';
import reducer from './reducers';
import { Router } from 'react-router-dom';
import history from './components/history';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
