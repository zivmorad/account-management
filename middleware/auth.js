const config = require('../config/default.json');
const jwt = require('jsonwebtoken');


const auth= async(req,res,next)=>{
    //get the token from req
    const token=req.header('x-auth-token')
    //check if not token
    if(!token){
        return res.status(401).send({message:"No token, authorization denied"})
    }
    //verify token
    try {
        const decoded=jwt.verify(token,config.jwtSecret)
        //insert to req filed user id
        req.userId=decoded.id
        next()
    } catch (e) {
        console.log(e.message)
        res.status(401).send({message:'Token is not valid'})
    }
}

module.exports=auth