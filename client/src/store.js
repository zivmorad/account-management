import {compose,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialStore={}
const middleware=[thunk]

const composeEnhancers =typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware),   );
   
const store=createStore(
    rootReducer,
    initialStore,
    enhancer
)

export default store
