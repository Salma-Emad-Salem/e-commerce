import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { wishListContext } from '../../context/WishList'


export default function Navbar() {
    let {counter , getCart, setCounter}=useContext(cartContext)
    let{addProductWishList , counterWish ,setCounterWish }=useContext(wishListContext)

    useEffect(()=>{
        //self invicd fUNCTION 
        ( async ()=>{
            let data = await getCart()
            if(data.status =='success'){
                setCounter(data.numOfCartItems)
               }
        })()

    })

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-4 ">
            <div className="container">
                <Link className="navbar-brand" to="#">
                <img src={logo} alt='logo'/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Categories">Categories</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Brands">Brands</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <i className="fa-brands fa-facebook  px-1 py-2"></i>
                        </li>
                        <li className="nav-item">
                        <i className="fa-brands fa-linkedin  px-1 py-2"></i>
                        </li>
                        <li className="nav-item">
                        <i className="fa-brands fa-instagram  px-1 py-2"></i>
                        </li>
                        <li className="nav-item">
                        <i className="fa-brands fa-twitter  px-1 py-2"></i>
                        </li>

                    <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="/Cart" id='add'>Cart
                    <i className='fa-solid fa-cart-shopping px-1'></i>
                    {counter ? <span className="position-absolute top-2 start-80 translate-middle badge rounded-circle bg-danger">
                    {counter }
                    <span className="visually-hidden">unread messages</span>
                    </span> :''}
                    </NavLink>
                    </li>
                    <li className="nav-item mx-3">
                    <NavLink className="nav-link position-relative" to="/WichList"> WishList
                    <i className='fa-solid fa-heart px-1'></i>
                    {counterWish ? <span className="position-absolute top-2 start-80 translate-middle badge rounded-circle bg-danger">
                    {counterWish }
                    <span className="visually-hidden">unread messages</span>
                    </span> :''}
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/SignIn" 
                    onClick={(()=>{
                        localStorage.clear()
                    })}>SignOut</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    </>
  )
}
