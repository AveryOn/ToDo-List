import React from "react";
import '../styles/navbar.css';

function MyNavbar({ modeView }) {
    let modeViewColor = '';
    if(modeView.current === 'complete') modeViewColor = 'rgb(105, 179, 105)';
    else if(modeView.current === 'not-complete') modeViewColor = 'rgb(223, 163, 52)';
    else if(modeView.current === 'creation') modeViewColor = 'tomato';
    else if(modeView.current === 'edit') modeViewColor = 'tomato';
    return (
        <div className="navbar">
            ToDo List
            <h1 
            className="navbar__mode-view"
            style={{color: modeViewColor}}
            >
                {`> ${modeView.title}`}
            </h1>
        </div>
    )
}

export default MyNavbar;