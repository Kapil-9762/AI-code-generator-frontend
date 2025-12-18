import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/authSlice';
const Narbar = ({userName}) => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    dispatch(authActions.logout());
  }
  return (
    <>
    <div className='navbar container flex jc-sb g-10 al-center'>
      <h1 className='logo'>GenCode</h1>
      <nav className='nav-items flex g-30 al-center'>
        <Link to="/" className='item'>Home</Link>
        <Link to="/about" className='item'>About</Link>
        {
            isLoggedin ? <Link className='logout' onClick={handleLogout} title='Logout'>{userName && userName.charAt(0).toUpperCase() || "👤"}</Link> : <Link to="/register" className='item'>Login</Link>
        }    
        <Link to="/generate" style={{display:"none"}}>Get Start</Link>
      </nav>
    </div>
    </>
  )
}

export default Narbar
