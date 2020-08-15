import React, { Component } from 'react'
import './Alert.css'
import { connect } from 'react-redux'


class Alert extends Component{

    renderInput=()=>{
        if(this.props.alerts!==null&&this.props.alerts.length>0){
            return this.props.alerts.map((alert,index)=>{
                return(
                    <div className='alert-error' key={index}>
                        {alert.msg}
                    </div>
                    )
            })
        }
    }

    render(){
        return(
            <div className='alerts-container'>
                {this.renderInput()}
            </div>
        )
    }
} 


const mapStateToProps=state=>{
    return{
        alerts:state.alert
    }
}

export default connect(mapStateToProps)(Alert)