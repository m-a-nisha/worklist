import React, { useEffect, useState } from 'react'
import './home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

export default function Home() {

  const [list, setList] = useState([]);
  const [title, setTitle] = useState(undefined);
  const [addTask, setTask] = useState(undefined)
  
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


  const AddTaskHandler = (e) => {
    e.preventDefault();
    if (e.target[0].value.length === 0) {
      toast.error("Please write your task");
      return;
    }
    setTask(e.target[0].value);
    fetch('/api/post', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        task: e.target[0].value
      })
    }).then(res => res.json())
      .then(result => {
        setTitle(result.title)
        setList(result)
      })
      .catch(err => console.log(err))
    e.target[0].value = ""
  }

  const RemoveTaskHandle = (item) => {
    fetch('/api/post/delete', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        title: item
      })
    }).then(res => res.json())
      .then(result => {
        setTitle(result.title)
        setList(result)
      })
      .then(toast.success("woww... One task Completed"))
      .catch(err => console.log(err))
  }

  const CompleteTask = (item) => {
    const data = item.item;
    fetch('/api/post/prior', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        task: data
      })
    }).then(res => res.json())
      .then(result => {
        setTitle(result.title)
        setList(result)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="homeContainer">
      <ToastContainer />
      <div className="home">
        <h1>My Work List</h1>
        <hr />
        <div className='homeBox'>
          <form onSubmit={AddTaskHandler} >
            <input type="text" name="" id="" placeholder="Task" />
            <button type='submit'>Add</button>
          </form>
          <div className="container">
            {
              title?
              title.length > 0 ?
                title.map(item => (
                  item.isprior ?

                    <div 
                      className='taskcontainer'
                      style={{ backgroundColor: "green", border: "1.5px solid white"}}
                      key={item._id}
                    >
                      <p className='green'>{item.task}</p>
                      <i style={{ color: "white" }} className="far fa-times-circle icon" onClick={() => RemoveTaskHandle({ item })}></i>
                    </div>
                    :
                    <div
                      className='taskcontainer'
                      style={{ backgroundColor: "white", border: "1.5px solid black" }}
                      key={item._id}
                    >
                      
                      <p >{item.task}</p>
                      <i
                        className="far fa-times-circle icon"
                        onClick={() => RemoveTaskHandle({ item })}
                        style={{ color: "red" }}
                      ></i>
                      <i
                        className="far fa-check-circle icon"
                        onClick={() => CompleteTask({ item })}
                        style={{ color: "green", marginRight: "5px" }}
                      ></i>
                     
                    </div>

                ))
                :
                <h3
                  style={{textAlign: "center", color: "whitesmoke"}}
                  >No Task</h3>
                :
                <Loader/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
