const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST")
const USER = mongoose.model("USER")

router.get("/allposts", requireLogin, (req, res)=>{
    POST.find()
    .populate("postedBy","_id name")
    .then(posts=>res.json(posts))
    .catch(err=> console.log(err))
})


router.post("/createPost",requireLogin,(req,res)=>{
    const {body, price, pic} = req.body;
    console.log(pic)
    if(!body || !price || !pic){
        return res.status(422).json({error:"Please add all the field required"})
    }
    console.log(req.user)
    const post = new POST({
        body,
        price,
        photo:pic,
        postedBy:req.user
    })
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch(err=>console.log(err))
})

router.get("/myposts", requireLogin, (req, res)=> {
   POST.find({ postedBy: req.user._id })
       .populate("postedBy", "_id name")
       .then(myposts=> {
           res.json(myposts)
   })
})

router.get("/myprofile", requireLogin, (req, res)=> {
    USER.find({ _id: req.user._id })
        .populate("_id", "_id name")
        .then(myprofile=> {
            res.json(myprofile)
    })
})


module.exports = router