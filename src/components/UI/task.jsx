import React from "react";
import '../../styles/task.css';

export default function Task({ data, deleteTask }) {
    return (
        <li className="task">
            <span className="task__no"></span>
            <p className="task__title">{data.title}</p>
            <p className="task__body">{data.body}</p>
            <div className="task__right-side">
                <p className="task__status" style={(data.isComplete) ? { color: 'rgb(90, 188, 90)', fontStyle: 'italic' } : { color: 'rgb(223, 163, 52)' }}>
                    {data.status}
                </p>
                <button className="task__options-btn">...</button>
            </div>
            {/* <button className="task__button" onClick={() => deleteTask(index)}>Delete</button> */}
        </li>
    )
}

