import React, { useContext, useEffect, useState } from 'react'
import './profile.css';
import { UserContext } from '../App'
import Modal from './Modal';
export default function Profile() {
    const { state, dispatch } = useContext(UserContext)
    const [list, setList] = useState([]);
    const [title, setTitle] = useState([]);
    console.log(title)
    let count = 0;
    for (let index = 0; index < title.length; index++) {
        if (title[index].isprior === true)
            count = count + 1;
    }
    console.log(count)
    useEffect(() => {
        fetch('/api/post/mylist', {
            headers: {
                "auth-token": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setTitle(result.title)
                setList(result)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div id='profile'>

            
            {/* <div className='profileSection'>
               
                <h2 style={{marginBottom:"11px"}}>Welcome to profile section</h2>
                <h1><i className="fas fa-user-circle"></i></h1>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <hr style={{ width: "29em", color: "black", margin:"2px"}} />
                </div>
                
                <div data-bs-toggle="modal" data-bs-target="#exampleModal" style={{margin:"1px"}}>
                    <span className='edit'><i className="fas fa-edit"></i></span>
                </div>
                <div className='details'>
                    <div>
                        <h6><i style={{color:"gray"}} className="fas fa-user"></i> Username: </h6>
                        <h6>{state ? state.name : ""}</h6>
                    </div>
                    <div>
                        <h6><i style={{ color: "gray" }} className="fas fa-envelope"></i> Email: </h6>
                        <h6>{state ? state.mail : ""}</h6>
                    </div>
                </div>
                
                <div className='details'>
                    <div>
                        <h6><i style={{ color: "red", fontSize: "1.5em" }} className="fas fa-clipboard-list"></i> Total Task : {title.length}</h6>

                    </div>
                    <div>
                        <h6><i style={{ color: "green", fontSize: "1.5em" }} className="fas fa-tasks"></i> Completed Task : {count}</h6>

                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h6  data-bs-toggle="modal" data-bs-target="#exampleModal" className="changepassword">Change Password ? <i className="fas fa-lock"></i></h6>
                    <Modal />
                </div>
            </div> */}
        </div>
    )
}
