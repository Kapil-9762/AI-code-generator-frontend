import React, { useState } from 'react'
import './Register.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { authActions } from '../../../store/authSlice';
import {PulseLoader} from "react-spinners";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!action) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`, inputs).then((res) => {
          if (res.data.message === "User already exist.") {
            return toast.info("User already exist.")
          }
          if (res.data.message === "Sign up successfully, do sign in now.") {
            toast.success("Sign up successfully, do sign in now.")
            setAction(true);
          }
        });
        setInputs({ username: "", email: "", password: "" });
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }
    if (action) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signin`, { email: inputs.email, password: inputs.password }).then((res) => {
          if (res.data.message === "Invalid email, please try again.") {
            toast.error("Invalid email, please try again.");
          }
          if (res.data.message === "your password is incorrect, try again.") {
            toast.error("your password is incorrect, try again.");
          }
          alert(`🙏 Welcome ${res.data.others.username}! You are successfully logged in`)
          localStorage.setItem("id", res.data.others._id)
          localStorage.setItem("name",res.data.others.username)
          dispatch(authActions.login());
          navigate("/generate")
        })
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }
  } 
  return (
    <div className='signup container flex jc-center al-center'>
      <ToastContainer/>
      <div className="signup-container flex f-col g-30 al-center">
        <h1>{action ? "Sign In" : "Sign Up"}</h1>
        <form className='flex f-col al-center g-30' onSubmit={handleFormSubmit}>
            {
                !action && <input type="text" name='username' placeholder='Enter your name' autoComplete='off' value={inputs.username} onChange={handleInputChange} required/>
            }
            <input type="email" name='email' placeholder='Enter your email' pattern="^[a-z0-9]+@gmail\.com$"
              autoComplete='off' value={inputs.email} onChange={handleInputChange} required/>
            <input type="password" name='password' placeholder='Enter your password' autoComplete='off' value={inputs.password} onChange={handleInputChange} required/>
            
            {
                action ? <p>Don't have an account? <span className='sign' onClick={()=>setAction(false)}>Sign Up</span></p> : <p>have you already an account?<span className='sign' onClick={()=>setAction(true)}> Sign In</span></p>
            }
          <button type='submit'>
            {loading && <PulseLoader color="#813bbbff" className='loading'/>}
            {
              action ?
                "Sign In"
                :
                "Sign Up"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
