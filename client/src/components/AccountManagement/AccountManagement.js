import React, { Component, Fragment } from 'react'
import './AccountManagement.css'
import {connect} from 'react-redux'
import { loadUser } from '../../actions/auth'
import Navbar from '../Navbar/Navbar'
import { Redirect } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import AccountDetails from './AccountDetails/AccountDetails'
import AccountOperations from './AccountOperations/AccountOperations' 

class AccountManagement extends Component{

    state={
        isloading:true
    }

    componentDidMount (){
       
        this.props.loadUser()
        setTimeout(()=>this.setState({isloading:false}),500)
       
    }

    render(){
            return(
                <Fragment>
                    {!this.props.auth.isAuthenticated?<Redirect to='/'/>:
                    this.state.isloading===true?<Spinner/>:
                    <div className='account-management-container'>
                    <Navbar/>
                    <AccountDetails/>
                    <AccountOperations/>
                    </div>}
                </Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        auth:state.auth,
        user:state.auth.user
    }
}

export default connect(mapStateToProps,{loadUser})(AccountManagement)