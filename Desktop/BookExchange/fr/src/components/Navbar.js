import React, {useContext} from 'react';
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({login}) {
  const {setModalOpen} = useContext(LoginContext)
  const navigate = useNavigate()

  const loginStatus = ()=>{
    const token =localStorage.getItem("jwt")
    if(login || token){
      return[
        <>
         <Link to={""}>
          
          <button
                className="homeBtn"
                onClick={() => {
                  navigate("./home");
                }}
              >
                Home
              </button>
         </Link>
         <Link to = "/profile">
           <li>Profile</li>
         </Link>
         <Link to="/createPost">Add Book</Link>
         <Link to={""}>
          
          <button
                className="primaryBtn"
                onClick={() => {
                  // setModalOpen(false);
                  localStorage.clear();
                  navigate("./signin");
                }}
              >
                Log Out
              </button>
         </Link>
        </>,
      ];

    } else{
      return[
        <>
          <Link to = "/signup">
            <li>SignUp</li>

          </Link>
          <Link to = "/signin">
            <li>SignIn</li>
          </Link>
        </>
      ]
      
    }
  };


  return (
    <div className='navbar'>
        <img src={logo} alt='' />
        <ul className='nav-bar'> 
         {loginStatus()}   
        </ul>
    </div>
    
  )
}
