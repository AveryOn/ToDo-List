import React from "react";
import '../styles/navbar.css';

function MyNavbar({children}){

    return (
        <div className="navbar">
            {children}
        </div>
    )
}

export default MyNavbar;