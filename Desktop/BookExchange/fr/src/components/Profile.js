
import React, {useEffect, useState} from 'react'
import "./Profile.css";


export default function Profile() {
  const [pic, setPic] = useState([])
  const [user, setUser] = useState([])

  useEffect(()=> {
   
    fetch("http://localhost:5000/myprofile",
    {
      headers:{
       Authorization : "amit " + localStorage.getItem("jwt")
      },
    }).then(res=>res.json())
    .then(result => setUser(result))
    .catch(err => console.log(err))


  

  fetch("http://localhost:5000/myposts",
    {
      headers:{
       Authorization : "amit " + localStorage.getItem("jwt")
      },
    }).then(res=>res.json())
    .then(result => setPic(result))
    .catch(err => console.log(err))


  }, [])
  return (

    <div className='profile'>
      {user.map((users)=>{
                return (
                    <>
                     <div className='profile-frame'>
                        <div className='profile-pic'>
                          <img src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' alt='' />
                        </div>
                        <div className='profile-data'>
                          <h1>{users.name}</h1>
                          <div className='profile-info' style={{display:"flex"}}>
                          </div>
                        </div>
                      </div>
                      <hr style={{
                        width:"90%",opacity:"0.8",margin:"25px auto"
                      }} />
                  <div className='gallery'>
                    {pic.map((pics)=>{
                       return (
                        <img key={pics._id} src={pics.photo} className="item"></img>
                      
                       )
                       })}
                       
                     

            </div></>
                )
              })}

          {/* <div className='profile-frame'>
            <div className='profile-pic'>
              <img src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' alt='' />
            </div>
            <div className='profile-data'>
              <h1>Amit</h1>
              <div className='profile-info' style={{ display: "flex" }}>
                <p>4 Book Posted  </p>
              </div>
            </div>
          </div><hr style={{
            width: "90%", opacity: "0.8", margin: "25px auto"
          }} /> */}
          
       
      
    </div>
  )
}
