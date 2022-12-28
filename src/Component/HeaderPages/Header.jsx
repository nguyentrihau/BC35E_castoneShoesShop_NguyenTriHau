//react class component, rcc
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { huyStore, TOKEN, USER_LOGIN } from '../../util/config';

const Header = () => {
    const { userLogin } = useSelector(state => state.userReducer);
    console.log(userLogin);
    const renderLogin = () => {
        if (userLogin) {
            return <>
            <NavLink className={'nav-link'} to='/profile'>
                <span style={{ color: 'white', fontSize: '20px' }}>Hello ! {userLogin.email}</span>
            </NavLink>
            <span style={{cursor:'pointer',color:'white',fontWeight:'500'}} onClick={()=>{
                            huyStore(TOKEN);
                            huyStore(USER_LOGIN);
                            // chuyen huong dang trang f5
                            window.location.href = '/login';
            }}>Đăng xuất</span>
            </>
        }
        return <>
            <li>
                <NavLink to='/login'>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/register">
                    Register
                </NavLink>
            </li>
        </>
    }
    return (
        <div>
            <div className="header__top d-flex justify-content-between align-items-center">
                <NavLink to="/"><img className="mx-5" src="./img/image 3.png" alt="logo" /></NavLink>
                <ul className="d-flex align-items-center my-0 mx-5 py-2 ">
                    <li>
                        <NavLink to="/search" className="header_search">
                            <i className="fa fa-search pr-1" aria-hidden="true"></i>
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/carts">
                            <img src="./img/cart.png" style={{ cursor: 'pointer' }} alt="..." />
                            <span>(1)</span>
                        </NavLink>
                    </li>
                    {renderLogin()}
                </ul>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link active" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Men</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Woman</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link disabled">Kid</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link disabled">Sport</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header