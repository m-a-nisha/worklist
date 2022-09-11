import React, { useState, useContext } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../App'
// import imag from '../image/to-do-list.png'
import Loader from './Loader';


export default function Reset() {
    const { userid } = useParams()
    console.log(userid)
    const navigate = useNavigate()
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setload] = useState(false);
    const { state, dispatch } = useContext(UserContext);
    const handleSubmit = (e) => {
        setload(true);
        e.preventDefault();
        if (password.length === 0) {
            toast.error("Enter valid password");
            return;
        }
        fetch(`/api/post/${userid}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                setload(false)
                if (data.error) toast.error(data.error);
                else {
                    dispatch({ type: "UPDATE", payload: { name:name } })
                    toast.success("Profile updated Succesfully")
                }
            })
            .then(n => {
                e.target[0].value = ""
                e.target[1].value = ""
                e.target[2].value = ""
            }
              
        )
       
    }

    const handleEmail = (e) => {
        setname(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <>{
            loader === false
            ?
            <div >
                <h5 style={{ textAlign: "center" }}>Edit your profile</h5>
                <ToastContainer />

                <div className="login reset">
                    <form style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} onSubmit={handleSubmit}>
                        <input style={{ margin: "7px auto" }} type="text" placeholder='Username' onChange={handleEmail} />
                        <input style={{ margin: "7px auto" }} type="password" name="password" id="password" placeholder='Password' />
                        <input style={{ margin: "7px auto" }} type="password" name="password" id="password" placeholder='Confirm Password' onChange={handlePassword} />
                        <button type="submit" >Reset</button>
                    </form>
                </div>
                </div>
                :
                <Loader/>
        }
        </>
       
        
    )
}
