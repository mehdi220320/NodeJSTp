const express = require('express')
const jwt =require('jsonwebtoken')
const User = require('../models/user')
const authentication=require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = new User({name, email, password})
        await user.save();
        res.status(201).send({message: "user saved Successfully ",user});
    } catch (e) {
        res.status(500).send({message:e.message})
    }
});
router.post('/login',async (req,res)=>{
    try {

        const {email,password}=req.body
        const  user=await User.findOne({email:email})
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        const isHavePassword=user.comparePassword(password)
        if(!isHavePassword){
            res.status(400).send({message:'invalid credentiels'})
        }
        const token=await jwt.sign({userId:user._id},process.env.SECRET_KEY)
        res.send({message:'user logged in successfully',token})

    }catch (e){
        res.status(500).send({message:e.message})
    }
})
router.get('/me',authentication,async (req,res)=>{
    try {
        const user=await User.findById(req.user.userId).select('-password')
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        res.send(user)
    }catch (e) {
        res.status(500).send({message:e.message})
    }
})
module.exports = router;