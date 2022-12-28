import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes,unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Carts from './pages/Carts/Carts';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import HomeTemplate from './temlates/HomeTemplate';
import './assets/scss/style.scss';
import {createBrowserHistory} from 'history';
//cau hinh redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore.jsx';
//cau hinh history
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='carts' element={<Carts />} />
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='profile' element={<Profile />} />
          <Route path='search' element={<Search />} />
          <Route path='*' element={<Navigate to="" />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
)
