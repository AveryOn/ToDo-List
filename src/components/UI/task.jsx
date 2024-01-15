import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import '../../styles/task.css';
import gsap from "gsap";

export default function Task({
    data,
    id,
    completeTask,
    openEditorTask,
    setTitleTask,
    setBodyTask,
    deleteTask,
    setCurrentTaskID,
    returnTask,
}) {
    const [isActiveMenuTask, setIsActiveMenuTask] = useState(false);
    // Функция отображает контекстное меню задачи
    function activeContextMenu(event) {
        event.stopPropagation();
        if (isActiveMenuTask) {
            Promise.resolve(gsap.to('.context-menu__list', { scale: 0, top: '-50%', right: '-10%', duration: .2 }))
                .then(() => setIsActiveMenuTask(false));
        }
        else {
            Promise.resolve(setIsActiveMenuTask(true))
                .then(() => gsap.to('.context-menu__list', { scale: 1, top: '-5%', right: '8%', duration: .4 }));
        }
    }
    // Рендеринг Контекстного меню Задачи
    let renderMenu;
    if (isActiveMenuTask) {
        renderMenu = <ContextMenu
            task={data}
            taskID={id}
            isCompleteTask={data.isComplete}
            completeTask={completeTask}
            setIsActiveMenuTask={setIsActiveMenuTask}
            openEditorTask={openEditorTask}
            setTitleTask={setTitleTask}
            setBodyTask={setBodyTask}
            deleteTask={deleteTask}
            returnTask={returnTask}
            setCurrentTaskID={setCurrentTaskID}
        />
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
            {renderMenu}
        </li>
    )
}

