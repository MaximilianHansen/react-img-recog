import React from 'react';
import "./FaceRecog.css";


const FaceRecog = ({box, imageUrl}) => {
    return (
        <div className = "center">
            <div className="absolute">
            <img alt='' id = "inputimage" className = "center resize ma4" src= {imageUrl} />
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div> 
       </div>
    );

}

export default FaceRecog;
