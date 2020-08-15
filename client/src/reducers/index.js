import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
import operations from './operation'

export default combineReducers({
    alert,
    auth,
    operations
})