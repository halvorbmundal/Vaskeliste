import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { isLoggedIn } from './api';
import * as logInActions from './actions/userActions';
import { createStore } from 'redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

isLoggedIn().then(res => {
  store.dispatch(logInActions.isLoggedIn(res));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
