import React from "react";
import '../../styles/input.css';

export default function MyInput({value, onChange}){
    return (
        <>
            <input className="input" value={value} onChange={(e) => onChange(e.target.value)}/>
        </>
    )
}

