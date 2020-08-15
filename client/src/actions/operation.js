import { 
    CREATE_OPERATION,
    GET_OPERATION, 
    DELETE_OPERATION,
} from './type'
import axios from '../api/axios'
import { setAlert } from '../actions/alert'

export const createOperation=operationData=>async dispatch=>{
    //get the operation data
    const { date, typeOfOperation, amount, description } =operationData
    const newDate=date.split('-').join(' ')
    try {
        //set the header of the http req
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }
    const body=JSON.stringify({ 
        typeOfOperation,
        date:newDate,
        amount,
        description
    })
        //save the operation in the db
        const res=await axios.post('/operation',body,config)
        dispatch({
            type:CREATE_OPERATION,
            payload:res.data
        })
    } catch (err) {
        console.log('in oration action err')
        //get the err from express-validator
        const errors=err.response.data.errors
        //if there is errors set alert
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
    }
}

export const getOperations=()=>async dispatch=>{
    //set the headers
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }
    //get all operation by spesific user
    const operations=await axios.get('/operation',config)
    let inc=0
    let dec=0
    operations.data.forEach(operation =>{
        if(operation.typeOfOperation==='inc'){
            inc+=parseInt(operation.amount)
        } else if (operation.typeOfOperation==='dec'){
            dec+=parseInt(operation.amount)
        }
    });
    
    dispatch({
        type:GET_OPERATION,
        payload:{
            arr:operations.data,
            inc,
            dec
        }
    })
}


export const deleteOperation=_id=>async dispatch=>{
    //create config and  body
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        },
        data:{
            _id
        }
    }
    //delete from the db
    const res=await axios.delete('/operation',config)
    dispatch({
        type:DELETE_OPERATION,
        payload:res.data
    })
}