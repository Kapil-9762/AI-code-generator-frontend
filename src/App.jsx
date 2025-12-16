import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Narbar from './components/Navbar/Narbar';
import Home from './components/Home/Home';
import About from './components/about/About';
import Register from './components/registration/Register';
import Generate from './components/Generate/Generate';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import Footer from './components/footer/Footer';
let id = localStorage.getItem("id");
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(authActions.login()); 
    }
  },[])
  return (
    <div>
      <div>
        <BrowserRouter>
          <Narbar/>
          <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/about" element={<About/>} />
             <Route path="/register" element={<Register />} />
             <Route path="/generate" element={<Generate />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer/>
    </div>
  )
}

export default App
