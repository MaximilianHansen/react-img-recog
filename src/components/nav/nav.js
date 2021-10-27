import React from 'react';


const Nav = ({signOut}) => {
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={() => signOut('signin')} className="f3 link dim black underline pa4 pointer" >Sign Out</p>
        </nav>
    );

}

export default Nav;

