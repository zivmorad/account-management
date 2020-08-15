import React, { Component, Fragment } from 'react'
import './RegisterPage.css'
import { registerUser } from '../../../actions/auth'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Alert from '../../Alert/Alert'
class RegisterPage extends Component{

   state = {
    firstName:'',
    lastName:'',
    id:'',
    email:'',
    password:'',
    bankName:'',
    bankAccount:'',
    totalMoney:'',
    monthlyLimit:''
   }

   onClick=e=>{
    this.props.registerUser(this.state)
    e.preventDefault()
}
       
    render(){
        return(
            <Fragment>
                {this.props.isAuthenticated?<Redirect to='/AccountManagement'/>:
                <div className='login-system-container' id='register-container'>
                    <div className='register-warp'>
                        <h1>Wellcome To Easy Bank</h1>
                        <div className='register-alert'>
                            <Alert/>
                        </div>
                        <p>Please fill all the fields in order to register </p>
                        <form className='register-form' autoComplete="off">
                            <h2>personal info</h2>
                            <input className='register-input' name='firstName'onChange={e=>this.setState({firstName:e.target.value})} placeholder='Enter Your First Name' type='text'/> 
                            <input className='register-input'name='lastName'onChange={e=>this.setState({lastName:e.target.value})} placeholder='Enter Your Last Name' type='text'/> 
                            <input className='register-input' name='id'onChange={e=>this.setState({id:e.target.value})} placeholder='ID' type='text'/>
                            <input className='register-input' name='email'onChange={e=>this.setState({email:e.target.value})} placeholder='Enter Your Email' type='text'/>
                            <input className='register-input' name='password'onChange={e=>this.setState({password:e.target.value})} placeholder='Enter Your Password' type='text'/>
                            <h2>account info</h2>
                            <input className='register-input' name='bankName'onChange={e=>this.setState({bankName:e.target.value})} placeholder='Enter Your Bank Name' type='text'/>
                            <input className='register-input' name='bankAccount'onChange={e=>this.setState({bankAccount:e.target.value})} placeholder='Enter Your Bank Account' type='text'/>
                            <input className='register-input' name='totalMoney'onChange={e=>this.setState({totalMoney:e.target.value})} placeholder='Enter Your Total Money' type='text'/>
                            <input className='register-input' name='monthlyLimit'onChange={e=>this.setState({monthlyLimit:e.target.value})} placeholder='Enter Your  Monthly Limit' type='text'/>
                            <div className='login-btns'>
                                <Link className='link-btn' to='/' id='login-link'>Login</Link>
                                <button className='submit-btn' onClick={this.onClick}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>}
            </Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{registerUser})( RegisterPage)