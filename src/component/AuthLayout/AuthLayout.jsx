import React from 'react'
import logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink , Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function AuthLayout() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
            <div className="container">
                <Link className="navbar-brand" to="#">
                <img src={logo} alt='logo'/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/SignIn">SignIn</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/SignUp">SignUp</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
     <Outlet/>
     <Footer/>
    </>
  )
}
