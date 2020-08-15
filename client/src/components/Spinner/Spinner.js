import React from 'react'
import './Spinner.css'
import spinner from '../../img/spinner.gif'

const Spinner =()=>{

    return(
        <div className='spinner-container'>
            <div className='spinner-warp'>
                <img className='spinner' src={spinner} alt='error'/>
                <p>Loading . . .</p>
            </div>
        </div>
    )
}

export default Spinner