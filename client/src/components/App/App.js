import React, { Fragment, Component } from 'react'
import './App.css'
import {BrowserRouter,Route} from 'react-router-dom'
import LoginPage from '../LoginSystem/LoginPage/LoginPage'
import RegisterPage from '../LoginSystem/RegisterPage/RegisterPage'
import AccountManagement from '../AccountManagement/AccountManagement'
import AccountInfo from '../AccountManagement/AccountInfo/AccountInfo'
//Redux
import {Provider } from 'react-redux'
import store from '../../store'
import { loadUser } from '../../actions/auth'




class App extends Component {

    componentDidMount(){
        store.dispatch(loadUser())
    }

    render(){
        return (
            <Provider store={store}>
                <Fragment>
                    <BrowserRouter>
                        <Route path='/' exact component={LoginPage}/>
                        <Route path='/register' exact component={RegisterPage}/>
                        <Route path='/AccountManagement' exact component={AccountManagement}/>
                        <Route path='/AccountInfo' exact component={AccountInfo}/>
                    </BrowserRouter>
                </Fragment>
            </Provider>
        )

    }
}

export default App