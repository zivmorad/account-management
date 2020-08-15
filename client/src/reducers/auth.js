import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_USER
} from '../actions/type'

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    user:null
}


//register user
export default function(state=initialState,action) {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            //when user success to register we his token to localstorage
            localStorage.setItem('token',action.payload.token)

            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload
            }      
        case UPDATE_USER:
            return{
                ...state,
                user:action.payload
            }    
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            //remove the token from localstorage
            localStorage.removeItem('token')

            return{
                ...state,
                token:null,
                isAuthenticated:false,
                user:null
            }
        default:
            return state
    }
    
}