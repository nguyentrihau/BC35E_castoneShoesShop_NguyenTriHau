import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/scss/style.scss';
//cau hinh redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore.jsx';
import App from './App';
//cau hinh history

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
