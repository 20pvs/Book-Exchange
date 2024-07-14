import React, { useState, useEffect } from 'react'
import "./Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
const [body, setBody] =  useState("");
const [image, setImage] = useState("")
const [url, setUrl] = useState("")
const [price, setPrice] = useState("")
const navigate = useNavigate()

const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg)
const [data, setData] = useState([])

useEffect(()=> {
    if(url){
        fetch("http://localhost:5000/createPost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"amit " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            body,
            price,
            pic:url
        })

       }).then(res=>res.json())
       .then(data=> {if(data.error){
         notifyA(data.error)
       }else{
         notifyB("Successfully posted")
         navigate("/")
       }})
       .catch(err => console.log(err))
    }
}, [url])

const postDetails = () => {
    console.log(body,price,image)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","amitbook")
    data.append("cloud_name","amitcloud2")
    fetch("https://api.cloudinary.com/v1_1/amitcloud2/image/upload",
    {
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))
   console.log(url)

}

    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src)
    }};
  return (
    <div className='createPost'>
        <div className='post-header'>
            <h4 style={{margin:"3px auto"}}>ADD BOOK</h4>
            <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
        </div>
        <div className='main-div'>
            <img id='output' src='https://static.thenounproject.com/png/132220-200.png'/>
            <input type='file' accept='image/*' onChange={(event)=>{loadfile(event);
            setImage(event.target.files[0])}} />
        </div>
        <div className='details'>
            <div className='card-header'>
                <div className='card-pic'>
                    <img src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' alt='' />
                </div>
            </div>
            
             <div>
                    <input type='number' name='price' id='price' value={price} placeholder='Enter Price' onChange={(e)=>{setPrice(e.target.value)}} />
            </div>
            <textarea value={body} onChange={(e)=>{setBody(e.target.value)
            }} type="text" placeholder='Info Of Book'></textarea>
        </div>
    </div>
  )
}
