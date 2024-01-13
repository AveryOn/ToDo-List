import React from "react";
import '../styles/navbar.css';

function MyNavbar({ modeView }) {
    
    console.log(modeView.title);
    return (
        <div className="navbar">
            ToDo List
            <h1 
            className="navbar__mode-view"
            style={(modeView.current === 'complete') ? { color: 'rgb(105, 179, 105)'} : { color: 'rgb(199, 170, 109)' }}
            >
                {`> ${modeView.title}`}
            </h1>
        </div>
    )
}

export default MyNavbar;