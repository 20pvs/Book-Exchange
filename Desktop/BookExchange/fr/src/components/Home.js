import React , {useEffect, useState} from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate =useNavigate();
  const [data, setData] = useState([])
  useEffect(()=>{

    const token = localStorage.getItem("jwt");
    if(!token){
      navigate("./signup")

    }

    fetch("http://localhost:5000/allposts",{
      headers:{
       "Authorization": "amit " + localStorage.getItem("jwt")
      },
    }).then(res=>res.json())
    .then(result => setData(result))
    .catch(err => console.log(err))
    

  }, [])
  return (
    <div className='home'>
      
      {data.map((posts)=>{
        return(
          <div className='card'>
             <div className='card-header'>

               <div className='card-pic'>
                 <img src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' alt='' />
               </div>
               <h5>{posts.postedBy.name}</h5>
             </div>
              <div className='card-image'>
                <img src={posts.photo} alt='' />
              </div>
              <div className='card-content'>      
                <p>{posts.body}</p>
              </div>
              <div className='add-comment'>
                 <button className='comment' onClick={() => {
                    navigate("./server");
                   }}>{posts.price}
                 </button>
             </div>
           </div>

        )
      })
      }
      
    </div>
  )
}
