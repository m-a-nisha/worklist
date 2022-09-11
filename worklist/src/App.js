import { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Profile from './component/Profile';
import Signup from './component/Signup';
import { reducer, initialState } from './reducer/UserReducer'

export const UserContext = createContext()
const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      // navigate("/")
    }
    else {
      navigate("/signin")
    }
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:userid" element={<Profile/>} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div className="App">
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Navbar />
            <Routing />
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
