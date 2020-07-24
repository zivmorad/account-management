const express=require('express')
require('./db/mongoose')
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const operationRouter=require('./routes/operation')

const app=express()

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
app.use(express.json())
//set the routers
app.use(userRouter)
app.use(authRouter)
app.use(operationRouter)