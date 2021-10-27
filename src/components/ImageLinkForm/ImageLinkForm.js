import React from 'react';
import "./ImageLinkForm.css";


const ImageLinkForm = ({onInputChange, onButtonClick}) => {
    return (
        <div className="">
            <div>
                <p className='center f3'> 
                    {'This Magic Brain will detect faces in your pictures, link a picture below!'}
                </p>
            </div>
            <div className="center">
                <div className="form pa4 br3 shadow-5 center">
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib bg-light-purple' onClick={onButtonClick}>Detect</button>
                </div>
            </div>

        </div>
    );

}

export default ImageLinkForm;
