
import { Outlet } from 'react-router-dom'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/HeaderPages/Header'

import React, { useEffect } from 'react'
import { getProfileApi } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import BackToTop from '../Component/btt/BackToTop'

const HomeTemplate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const action = getProfileApi;
        dispatch(action);
      }, [])
  return (
    <div id='btt'>
      <BackToTop />
    <header><Header/></header>
    <div>
        <Outlet />
    </div>
    <footer><Footer/></footer>
</div>
  )
}

export default HomeTemplate
