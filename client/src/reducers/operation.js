import {    
    CREATE_OPERATION,
    GET_OPERATION,
    DELETE_OPERATION,
    DELETE_ALL_OPERATIONS
} from '../actions/type'

const initialState={
    arr:[],
    dec:0,
    inc:0
}

export default function(state=initialState,action){

    switch (action.type) {
        case CREATE_OPERATION:
            if(action.payload.typeOfOperation==='Increase'){
                return{
                    ...state,
                    arr:[...state.arr,action.payload],
                    inc:state.inc+parseInt(action.payload.amount)
                }
            } else if(action.payload.typeOfOperation==='Decrease'){
                return{
                    ...state,
                    arr:[...state.arr,action.payload],
                    dec:state.dec+parseInt(action.payload.amount) 
                }
            }    
            break
        case GET_OPERATION:
            return {...state,
                    arr:action.payload.arr,
                    inc:action.payload.inc,
                    dec:action.payload.dec}
        case DELETE_OPERATION:
            if(action.payload.typeOfOperation==='Increase'){
                return{
                    ...state,
                    arr:state.arr.filter(item=>{return item._id!==action.payload._id}),
                    inc:state.inc-parseInt(action.payload.amount)
                }
            } else if(action.payload.typeOfOperation==='Decrease'){
                return{
                    ...state,
                    arr:state.arr.filter(item=>{return item._id!==action.payload._id}),
                    dec:state.dec-parseInt(action.payload.amount) 
                }
            }    
            break   
        case DELETE_ALL_OPERATIONS:
            return{
                arr:[],
                inc:0,
                dec:0
            }       
        default:
            return state
    }
}