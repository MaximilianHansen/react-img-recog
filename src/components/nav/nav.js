import React from 'react';


const Nav = ({onRouteChange, onSignIn}) => {
if(onSignIn){
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa4 pointer" >Sign Out</p>
        </nav>
    );} else {
        return (
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa4 pointer" >Sign In</p>
                <p onClick={() => onRouteChange('register')} href="#0" className="f3 link dim black underline pa4 pointer">Register</p>
            </nav>)
    }

}

export default Nav;

