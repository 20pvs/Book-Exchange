import React,{useEffect,useState} from 'react';
import logo from "../img/logo.png";
import "./SignUp.css";
import { Link ,useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const postData = () => {

        if(!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }else if(!passRegex.test(password)){
            notifyA("Password must conatin at least 8 character, Should me strong")
            return
        }

        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then(res=>res.json())
          .then(data =>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate("/signin")
            }
            console.log(data)})
    }


  return (
    <div className='signUp'>
        <div className='form-container'>
              <div className='form'>
                  <img className='signUpLogo' src={logo} alt='' />
                  <p className='loginPara'>
                      Sign Up In Book Exchange PlatForm To Exchange Book.
                  </p>
                  <div>
                      <input type='email' name='email' id='email' value={email} placeholder='Enter Email Id' onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                  <div>
                      <input type='text' name='name' id='name' value={name} placeholder='Enter Full Name' onChange={(e)=>{setName(e.target.value)}} />
                  </div>
                  <div>
                      <input type='text' name='username' id='username' value={userName} placeholder='Enter UserName' onChange={(e)=>{setUserName(e.target.value)}} />
                  </div>
                  <div>
                      <input type='password' name='password' id='password' value={password} placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}} />
                  </div>
                  <p className='loginPara'>By sigining up, you agree to out Terms, <br /> privacy policy and
                      cookies policy.</p>
                  <input type='submit' id='submit-btn' value="Sign Up" onClick={()=>{postData()}} />
              </div>
              <div className='form2'>
                Already have an account?
                <Link to="/signin">
                <span style={{color:"blue",cursor:"pointer"}}>Singn In</span> 
                
                </Link>
              </div>
            
        </div>
    </div>
  )
}
