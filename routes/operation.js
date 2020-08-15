const express=require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
const {check,validationResult }=require('express-validator')
const User=require('../models/User')
const Operation = require('../models/operation')

//@rout    POST/operation
//@desc    create operation
//@access  private
router.post('/operation',[auth,[
check('typeOfOperation','Type is required').not().isEmpty(),
check('date','Date is required').not().isEmpty(),
check('description','Description is required').not().isEmpty(),
check('amount','Amount is required and positive number').isInt({gt:0}),
]],async(req,res)=>{
    try {
         //check if there is arrors
         const errors=validationResult(req)
         if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
         }
        //create new operation
        const operation=new Operation({
            userId:req.userId,
            typeOfOperation:req.body.typeOfOperation,
            description:req.body.description,
            amount:req.body.amount,
            date:req.body.date
        })
            await operation.save()
            res.status(201).send(operation)
            
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})


//@rout    GET/operation
//@desc    get all operation by spesific user
//@access  private
router.get('/operation',auth,async(req,res)=>{
    try {
        //get all operation by spesific user
        const operations=await Operation.find({userId:req.userId}).sort({date:-1})
        if(!operations){
            res.status(404).send({msg:'No operation by this user'})
        }
        res.status(200).send(operations)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})


//@rout    DELETE/operation
//@desc    del spesific operation by id
//@access  private

router.delete('/operation',auth,async(req,res)=>{
    try {
        //get the operation
        const operation=await Operation.findById(req.body._id)
        //del from db
        await operation.remove()
        res.status(200).send(operation)
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e)
    }
})

//@rout    DELETE/operations
//@desc    del all operations spesific by user id
//@access  private

router.delete('/operation/all',auth,async(req,res)=>{
    try {
        //get and dell the operations
        const operations=await Operation.deleteMany({userId:req.userId})
        res.status(200).send(operations)
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e)
    }
})


module.exports=router