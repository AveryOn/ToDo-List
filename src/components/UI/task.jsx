import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import '../../styles/task.css';

export default function Task({ data, id, completeTask, isCompletedTasks }) {
    const [isActiveMenuTask, setIsActiveMenuTask] = useState(false);
    function activeContextMenu(event) {
        event.stopPropagation();
        if(isActiveMenuTask) setIsActiveMenuTask(false);
        else setIsActiveMenuTask(true);
    }
    let renderMenu;
    if(isActiveMenuTask) {
        renderMenu = <ContextMenu/>
    } else {
        renderMenu = null;
    }

    // Функция закрашивает точку task_no
    function fillCircle() {
        const circle = document.getElementById(id);
        circle.children[0].style.background = 'rgb(8, 239, 173)';
    }
    // Функция последовательно выполняет fillCircle и completeTask который приходит с App.js
    function selectTask() {
        Promise.resolve(fillCircle())
            .then(() => {
                completeTask(id);
            })
            .catch((err) => console.log(err))
    }
    return (
        <li className="task" id={id} onClick={selectTask}>
            <span className="task__no" style={(data.isComplete) ? { display: 'none' } : { display: 'block' }}></span>
            <p className="task__title">{data.title}</p>
            <p className="task__body">{data.body}</p>
            <div className="task__right-side">
                <p className="task__status" style={(data.isComplete) ? { color: 'rgb(90, 188, 90)', fontStyle: 'italic' } : { color: 'rgb(223, 163, 52)' }}>
                    {data.status}
                </p>
                <button className="task__options-btn" onClick={activeContextMenu}>...</button>
            </div>
            {/* <button className="task__button" onClick={() => deleteTask(index)}>Delete</button> */}
            {renderMenu}
        </li>
    )
}

