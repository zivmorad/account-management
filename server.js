const express=require('express')
const connectDB=require('./db/mongoose')
const cors = require('cors')
require('./db/mongoose')
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const operationRouter=require('./routes/operation')
const path=require('path')
const app=express()
connectDB()
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
//serve static assets in production
if(process.env.NODE_ENV==='production'){
  //set the static folder
  app.use(express.static('client/build'))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`)
})