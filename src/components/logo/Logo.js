import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brains from './brains.png'


const Logo = () => {
    return (
       <div> 
            <Tilt className="Tilt br2 shadow-2 ma4" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3 tc"> <img style={{paddingTop: '5px'}} alt='logo' src={brains}></img> </div>
            </Tilt>
        </div>
    );

}

export default Logo;
