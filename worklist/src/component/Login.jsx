import React, { useState, useContext } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import imag from '../image/to-do-list.png'


export default function Login() {

  const navigate = useNavigate()
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) toast.error(data.error);
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })
          toast.success("Login Successfully")
          navigate("/")
        }
      })
  }

  const handleEmail = (e) => {
    setemail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div id="Container" className='direction2'>

        <ToastContainer />
      <div className='LoginContainer log'>
        <h2>Login</h2>
        <hr />
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Email' onChange={handleEmail} />
            <input type="password" name="password" id="password" placeholder='Password' onChange={handlePassword} />
            <button type="submit">Login</button>
          </form>
        </div>
        <p className='navigate' >
          Don't have account?
          <span>
            <Link to="/signup" style={{ fontSize: "0.85em" }}>  Register now</Link>
          </span>
        </p>
      </div>
      <div className='heading sign'>
        <h1>Create Your Work List</h1>
        <h3>organise your Task and set priorities</h3>
        <h3>Plan your workflow</h3>
        <div style={{margin: "auto"}} >
          <img src={imag} className='loginImg' alt="" />
        </div>
      </div>
    </div>
  )
}
