import {SET_ALERT,REMOVE_ALERT} from '../actions/type'

const initialState=[]

export default function(state=initialState,action){
    const {type,payload}=action
    switch (type) {
        case SET_ALERT:
            //our payload is alert obj
            return [...state,payload]
        case REMOVE_ALERT:
            //our payload is alert id
            return state.filter(alert=>alert.id!==payload)
        default:
            return state
    }
}