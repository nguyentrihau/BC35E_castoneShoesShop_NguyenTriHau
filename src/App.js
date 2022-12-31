import React from 'react'
import { BrowserRouter, Navigate, Route, Routes,unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Carts from './pages/Carts/Carts';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import HomeTemplate from './temlates/HomeTemplate';
import {createBrowserHistory} from 'history';
import { getToken } from './util/config';

export const history = createBrowserHistory();

const App = () => {
  const token = getToken();
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='login' element={token?<Navigate to="/profile"/> :<Login />} />
          <Route path='register' element={<Register/>} />
          <Route path='carts' element={token ? <Carts /> : <Navigate to="/login" />} />
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='profile' element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path='search' element={<Search />} />
          <Route path='*' element={<Navigate to="" />} />
        </Route>
      </Routes>
    </HistoryRouter>
  )
}

export default App