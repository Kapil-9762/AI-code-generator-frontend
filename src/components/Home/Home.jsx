import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";
const Home = () => {
  return (
    <div className='home container flex al-center jc-center'>
      <div className="home-container flex f-col g-10">
        <h1>Build Components Instantly With AI <br /> <span style={{color:" rgb(121, 0, 235)"}}>(Artificial Intelligence)</span></h1>
        <p>Generate responsive UI components automatically using AI in seconds</p>
        <button><Link to="/generate" style={{color:"rgb(80, 201, 0)"}}>Get Start <IoArrowForward className='arrow'/></Link></button>
      </div>
    </div>
  )
}

export default Home
