import  React, { Component } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import logo from '../../img/zivLogo.png'
import {connect} from 'react-redux'
import { logout,deleteUser } from '../../actions/auth'
class Navbar extends Component{

    render(){
        return(
            <div className='nav-container'>
                <img className='ziv-logo' alt='error' src={logo}/>
                <ul className='nav-links'>
                    <li>
                        <Link className='nav-link' to='/accountmanagement'>
                            <i className="fas fa-dollar-sign fa-2x"></i>
                            <p>Account Management</p>
                        </Link> 
                    </li>
                    <li>
                        <Link className='nav-link' to='/accountinfo'>
                            <i className="fas fa-info-circle fa-2x"></i>
                            <p>Personal Info</p>
                        </Link>            
                    </li>
                    <li className='user-circle-icon'>
                        <i className="fas fa-user-circle fa-2x"></i>
                        <div className='sub-menu-user-circle'>
                            <ul>
                                <li onClick={this.props.logout}>Logout</li>
                                <li onClick={this.props.deleteUser}>Delete</li>
                            </ul>
                        </div>
    
                    </li>
                </ul>
    
            </div>
        )
    }
    
}


export default connect(null,{logout,deleteUser})(Navbar)