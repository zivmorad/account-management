import axios from '../api/axios'
import { setAlert } from '../actions/alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    DELETE_ALL_OPERATIONS,
    UPDATE_USER
} from './type'


//Register user
export const registerUser=(userData)=>async dispatch=>{

    const { firstName, lastName, id, email, password, bankName, bankAccount, totalMoney, monthlyLimit }=userData
  //create the register requset config and body
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({ 
        firstName,
        lastName,
        id,
        email,
        password,
        bankName,
        bankAccount,
        totalMoney,
        monthlyLimit
    })

    try {
        //make the post requset-> create user and store in db
        const res=await axios.post('/users',body,config)
        //res.data will contain the new token for the new user
        dispatch({type:REGISTER_SUCCESS,payload:res.data})

        dispatch(loadUser())
        
    } catch (err) {
        //get the err from express-validator
        const errors=err.response.data.errors
        //if there is errors set alert
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        dispatch({type:REGISTER_FAIL})
    }

}


export const login= userData =>async dispatch=>{

    const { email, password }=userData
  //create the config and body to login
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({ 
        email,
        password,
    })

    try {
        //make the post requset-> get new token for the login user
        const res=await axios.post('/auth',body,config)
        //res.data will contain the new token for the new user
        dispatch({type:LOGIN_SUCCESS,payload:res.data})

        dispatch(loadUser())
        
    } catch (err) {
        //get the err from express-validator
        const errors=err.response.data.errors
        //if there is errors set alert
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        dispatch({type:LOGIN_FAIL})
    }

}
//update user
export const updateUser=(userData,history)=>async dispatch=>{
    try {
    //delete isLoading from my state
    delete userData['isLoading']
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }
    const body=JSON.stringify(userData)
    const res=await axios.patch('/auth',body,config)
    dispatch({
        type:UPDATE_USER,
        payload:res.data
    })    
    history.push('/')
    } catch (err) {
        //get the err from express-validator
        const errors=err.response.data.errors
        //if there is errors set alert
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
    }
}

//Load user
export const loadUser = () => async dispatch => {

    //set the header of the http req
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    try {
        //get the user by the token
        const res=await axios.get('/auth',config)
       
        dispatch({
            type:USER_LOADED,
            payload:res.data   //res.data -> user
        })
    } catch (e) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//logout
export const logout=()=>dispatch=>{
    dispatch({type:LOGOUT})
}
//logout and delete all operations and delete user
export const deleteUser=()=>async dispatch=>{
    const confing={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }
    await axios.delete('/operation/all',confing)
    dispatch({type:DELETE_ALL_OPERATIONS})
    await axios.delete('/users',confing)
    dispatch({type:LOGOUT})
} 


