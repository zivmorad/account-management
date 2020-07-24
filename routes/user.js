const express=require('express')
const router=new express.Router()
const User=require('../models/User')
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const config=require('../config/default.json')

//@rout    POST/users
//@desc    Register user
//@access  Public
router.post('/users',async(req,res)=>{
    //get the user
    const user=new User(req.body)
    try {
        //create token
        const token=jwt.sign({id:user.id},config.jwtSecret,{expiresIn:'1 day'})
        //create pic with gravatar-email url
        const avatar =gravatar.url(user.email,{
            s:'200', //size of the pic
            r:'pg',
            d:'mm' //defult img
        })
        user.avatar=avatar
        //store the user in db
        await user.save()
        res.status(201).send({user,token})
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})


module.exports=router