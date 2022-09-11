import React, { useState } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import imag1 from '../image/worklist.png'
import imag from '../image/to-do-list.png'
export default function Signup() {
  const navigate = useNavigate()
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) toast.error(data.error)
        else toast.success(data.message)
      })
      .then(navigate("/signup"))
      .catch(err => toast.error(err))
  }

  const handleName = (e) => {
    setname(e.target.value)
  }
  const handleEmail = (e) => {
    setemail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div id="Container" className='direction'>
      <ToastContainer />
      <div className='heading log'>
        <h1>Create Your Work List</h1>
        <h3>organise your Task and set priorities</h3>
        <h3>Plan your workflow</h3>
        
        <img src={imag} className='loginImg' alt="" />
        {/* <img src={imag1} className='loginImg2' alt="" /> */}
      </div>
      <div className='LoginContainer sign'>
        
        <h2>Regsiter</h2>
        <hr />
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' onChange={handleName} />
            <input type="text" placeholder='Email' onChange={handleEmail} />
            <input type="password" name="password" id="password" placeholder='Password' onChange={handlePassword} />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <p className='navigate' >
          Already have account?
          <span>
            <Link to="/signin" style={{ fontSize: "0.85em" }}>  Login now</Link>
          </span>
        </p>
      </div>

    </div>
  )
}
