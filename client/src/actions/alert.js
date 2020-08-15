import {SET_ALERT,REMOVE_ALERT} from './type'
import { v4 as uuidv4 } from 'uuid';

export const setAlert=msg=>dispatch=>{
    //create new id
    const id=uuidv4()
    //set allert 
    dispatch({
        type:SET_ALERT,
        payload:{
            id,
            msg
        }})

    //dispatch the type and the spesific id that we want to remove after 3 sec
    setTimeout(() => {
        dispatch({
        type:REMOVE_ALERT,
        payload:id
    })}, 3000);    
}

