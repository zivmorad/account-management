import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { loadUser,updateUser } from '../../../actions/auth'
import { Redirect,Link} from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'
import './AccountInfo.css'

class AccountInfo extends Component{

    state = {
        isLoading:true
       }
    

    componentDidMount(){
        this.props.loadUser()
        
    }
    
    updateUser=(e)=>{
        //get all the keys from my state
        const keys=Object.keys(this.state)
        //if there are empty value in some key in y state->delete them
        keys.forEach(key=>{
            if(this.state[key]===''){
                delete this.state[key]
            }
        })
        //send the state to the update user func
        this.props.updateUser(this.state,this.props.history)
        
        e.preventDefault()
    }
    render(){
        return(
            <Fragment>
                {!this.props.isAuthenticated?<Redirect to='/'/>:
                this.state.isloading===true?<Spinner/>:
                <div className='login-system-container' id='update-container'>
                    <div className='register-warp'>
                        <h1>Wellcome To Easy Bank</h1>
                        <p>Please fill all the fields you want in order to update your profile </p>
                        <form className='register-form' id='update-form' autoComplete="off" >
                            <h2>personal info</h2>
                            <input className='register-input' name='firstName'onChange={e=>this.setState({firstName:e.target.value})} placeholder={this.props.user.firstName} type='text'/> 
                            <input className='register-input'name='lastName'onChange={e=>this.setState({lastName:e.target.value})} placeholder={this.props.user.lastName} type='text'/> 
                            <input className='register-input' name='id'onChange={e=>this.setState({id:e.target.value})} placeholder={this.props.user.id} type='text'/>
                            <input className='register-input' name='email'onChange={e=>this.setState({email:e.target.value})} placeholder={this.props.user.email} type='text'/>
                            <input className='register-input' name='password'onChange={e=>this.setState({password:e.target.value})} placeholder={this.props.user.password} type='text'/>
                            <h2>account info</h2>
                            <input className='register-input' name='bankName'onChange={e=>this.setState({bankName:e.target.value})} placeholder={this.props.user.bankName} type='text'/>
                            <input className='register-input' name='bankAccount'onChange={e=>this.setState({bankAccount:e.target.value})} placeholder={this.props.user.bankAccount} type='text'/>
                            <input className='register-input' name='totalMoney'onChange={e=>this.setState({totalMoney:e.target.value})} placeholder={this.props.user.totalMoney} type='text'/>
                            <input className='register-input' name='monthlyLimit'onChange={e=>this.setState({monthlyLimit:e.target.value})} placeholder={this.props.user.monthlyLimit} type='text'/>
                            <div className='login-btns'>
                                <button className='submit-btn' onClick={(e)=>this.updateUser(e)}>Update</button>
                                <Link className='link-btn' to='/AccountManagement'>Back</Link>
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
        user:state.auth.user,
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{loadUser,updateUser})(AccountInfo)