import React from 'react';
import './random-planets.css';

const RandomPlanet = () => {
    return(
        <div className='random-planet jumbotron rounded' >
            <img className='planet-image'/>
         <div>              
      
            <h4> Planet name</h4>
            <ul className='list-group-item list-group-flush'>
                <li className='list-group-item'>
                    <span className='term'> Population</span> 
                </li>
                <li className='list-group-item'>
                    <span className='term'> Population</span> 
                </li><li className='list-group-item'>
                    <span className='term'> Population</span> 
                </li>
            </ul>
            </div>   
        </div>
    );
};

export default RandomPlanet;