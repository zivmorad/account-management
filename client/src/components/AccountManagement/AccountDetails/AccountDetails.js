import React, { Fragment, Component } from 'react'
import {connect} from 'react-redux'
import './AccountDetails.css'

class AccountDetails extends Component{

    render(){
        return(
            <Fragment>  
                        <div className='current-status'>
                            <div className='current-status-items'>
                                <div className='current-status-item'>
                                    <i id='current-nis-icon' className="fas fa-money-check-alt fa-3x"></i>
                                    <div>
                                        <i className="fas fa-shekel-sign fa-2x"></i> 
                                        <span className='current-info-nis'>{this.props.user.totalMoney}</span> 
                                    </div>
                                    Current account status
                                </div>
                            <div className='current-status-item '>
                                    <i id='take-nis-icon' className="fas fa-hand-holding-usd fa-3x"></i>
                                    <div>
                                        <i className="fas fa-shekel-sign fa-2x"></i> 
                                        <span className='current-info-nis'>{this.props.operations.inc}</span> 
                                    </div>
                                    Income
                            </div>
                            <div className='current-status-item'>
                                    <i id='give-nis-icon' className="far fa-credit-card fa-3x"></i>
                                    <div>
                                        <i className="fas fa-shekel-sign fa-2x "></i> 
                                        <span className='current-info-nis'>{this.props.operations.dec}</span> 
                                    </div>
                                    Expenses
                            </div>
                            <div className='current-status-item'>
                                    <i id='stop-nis-icon' className="far fa-hand-paper fa-3x"></i> 
                                    <div> 
                                        <span className='current-info-nis'>{this.props.user.monthlyLimit}</span> 
                                    </div>
                                    Limited money per month
                            </div>
                            </div>
                        </div>
            </Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        user:state.auth.user,
        operations:state.operations
    }
}

export default connect(mapStateToProps)(AccountDetails)