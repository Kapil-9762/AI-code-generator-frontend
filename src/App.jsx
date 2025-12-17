import React, { useEffect, useState } from 'react'
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
import { PacmanLoader } from 'react-spinners';
let id = localStorage.getItem("id");
let userName = localStorage.getItem("name");
const App = () => {
    const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

   useEffect(() => {
    const ready = () => setLoading(false);
    if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready);
    }
    return () => {
      window.removeEventListener("load", ready);
    };
   }, []);
  useEffect(() => {
    if (id && userName) {
      dispatch(authActions.login()); 
    }
  }, [])
  return (
    <>
      {
        loading ? <PacmanLoader color='#e0bfffff' className='pageLoader'/>
          :
          <div>
            <div>
              <BrowserRouter>
                <Narbar userName={userName} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/generate" element={<Generate />} />
                </Routes>
              </BrowserRouter>
            </div>
            <Footer />
          </div>
      }
    </>
  )
}

export default App
