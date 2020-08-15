import React, { Component } from 'react'
import './AccountOperations.css'
import { connect } from 'react-redux'
import { createOperation,getOperations,deleteOperation } from '../../../actions/operation'
import { setAlert } from '../../../actions/alert'
import Alert from '../../Alert/Alert'
class AccountOperations extends Component{

    state={
        typeOfOperation:'',
        date:'',
        description:'',
        amount:'',
    }

    componentDidMount(){
        this.props.getOperations()
    }

    onClick=(e)=>{        
        if(this.state.typeOfOperation==='Decrease'&&parseInt(this.props.user.monthlyLimit)<parseInt(this.props.operations.dec)+parseInt(this.state.amount)){
            this.props.setAlert('You cannot pass your monthly limit')
            e.preventDefault()
            return
        }
        this.props.createOperation(this.state)
        this.setState({
            typeOfOperation:'',
            date:'',
            description:'',
            amount:'',
        })
        e.preventDefault()
    }

    renderOperations=()=>{
        return this.props.operations.arr.map((operation,index)=>{
            return(
                <tr key={operation._id}>
                    <td>{index+1}</td>
                    <td>{operation.date}</td>
                    <td>{operation.typeOfOperation}</td>
                    <td>{operation.description}</td>
                    <td>{operation.amount}</td>
                    <td><i className="fas fa-trash-alt" onClick={()=>this.delete(operation._id)}></i></td>
                </tr>
            )
        })
    }

    delete=id=>{
        this.props.deleteOperation(id)
    }

    render(){
        return(
            <div className='operation-container'>
                    <div className='operation-box'>
                    <h3>Operations</h3>
                    <div className='operation-alert'>
                        <Alert/>
                    </div>
                        <form className='operation-form' id='operation-form'>
                            <input className='input-type-oreration' type='string' list='type' placeholder='Type Of Operation' onChange={(e)=>this.setState({typeOfOperation:e.target.value})} value={this.state.typeOfOperation}/>
                            <datalist id='type' >
                                <option value='Increase' />
                                <option value='Decrease'/>
                            </datalist>
                            <input type='date' onChange={(e)=>this.setState({date:e.target.value})} value={this.state.date}/>
                            <input type='text' placeholder='Description' onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description}/>
                            <input type='number' placeholder='amount' onChange={(e)=>this.setState({amount:e.target.value})} value={this.state.amount}/>
                            <button className='submit-btn' onClick={this.onClick}>Submit</button>
                        </form>
                            {this.props.operations.arr.length!==0?<table className='table-container'>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>  
                                </thead>
                            <tbody>
                                {this.renderOperations()}
                            </tbody>
                            </table>:null}
                        </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        operations:state.operations,
        user:state.auth.user
    }
}

export default connect(mapStateToProps,{createOperation,setAlert,getOperations,deleteOperation})(AccountOperations)