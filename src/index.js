import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

const store = configureStore();
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
document.getElementById('root').style.height = "100%";

serviceWorker.unregister();