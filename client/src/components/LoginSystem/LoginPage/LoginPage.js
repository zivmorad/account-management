import React, { Component, Fragment } from 'react'
import './LoginPage.css'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login} from '../../../actions/auth'
import Alert from '../../Alert/Alert';

class LoginPage extends Component{

    state = {
        email:'',
        password:''
    }
    
    onClick=e=>{
        this.props.login(this.state)
        e.preventDefault()
    }
    

    render(){
        return(
            <Fragment>
                {this.props.isAuthenticated?<Redirect to='/AccountManagement'/> :
                <div className='login-system-container'>
                    <form className='login-form' autoComplete="off">
                        <div className='login-text'>
                            <h1 className='login-title'>Easy Bank</h1>
                            <p className='login-subtitle'>Please login to proceed</p>
                            <div className='login-alert'>
                                <Alert/>
                            </div>
                        </div> 
                        <input name='email' className='login-input' type='text' placeholder="Enter Your Email" onChange={e=>this.setState({email:e.target.value})}/>            
                        <input name='password'  className='login-input' type='password' placeholder="Enter Your Password"  onChange={e=>this.setState({password:e.target.value})} />
                        <div className='login-btns'>
                            <button className='submit-btn' onClick={this.onClick}>Login</button>
                            <Link className='link-btn' to='/register'>Register</Link>
                        </div>
                    </form>
                </div>  
                }  
            </Fragment>
        )

    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{login})(LoginPage)