import React from "react";
import '../../styles/tab.css';

export default function Tab({children, onClick}) {
    return(
        <li className="tab" onClick={onClick}>
            {children}
        </li>
    )
}