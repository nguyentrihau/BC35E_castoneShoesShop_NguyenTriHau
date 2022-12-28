import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/HeaderPages/Header'
export default class HomeTemplate extends Component {
    render() {
        return (
            <div>
                <header><Header /></header>
                <div>
                    <Outlet />
                </div>
                <footer><Footer/></footer>
            </div>
        )
    }
}
