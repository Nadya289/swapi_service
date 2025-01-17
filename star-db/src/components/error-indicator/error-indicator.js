import React from 'react'
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return(
    <div className='error-indicator'>
        <img src = {icon} alt = 'error icon'/>
        <span className='boom'>BOOOOM!</span>
        <span>
            Somrthing has gone terribly wrong
        </span>
        <span>
            (but we already droids to fix it)
        </span>
    </div> 
    );
};
export default ErrorIndicator;