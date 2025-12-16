import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/authSlice';
import { toast, ToastContainer } from 'react-toastify';
const Narbar = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const handleLogout = () => {
    localStorage.removeItem("id");
    dispatch(authActions.logout());
    toast.success("You are logged out successfully.")
  }
  return (
    <>
    <ToastContainer/>
    <div className='navbar container flex jc-sb g-10 al-center'>
      <h1 className='logo'>GenCode</h1>
      <nav className='nav-items flex g-30 al-center'>
        <Link to="/" className='item'>Home</Link>
        <Link to="/about" className='item'>About</Link>
        {
          isLoggedin ? <Link className='item' onClick={handleLogout}>Logout</Link> : <Link to="/register" className='item'>Login</Link>
        }    
        <Link to="/generate" style={{display:"none"}}>Get Start</Link>
      </nav>
    </div>
    </>
  )
}

export default Narbar
