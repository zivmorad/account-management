const express=require('express')
const connectDB=require('./db/mongoose')
const cors = require('cors')
require('./db/mongoose')
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const operationRouter=require('./routes/operation')

const app=express()
connectDB()
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  
app.use(express.json())
//set the routers
app.use(userRouter)
app.use(authRouter)
app.use(operationRouter)