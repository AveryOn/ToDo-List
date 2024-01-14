import React, { useEffect } from "react";
import '../../styles/ContextMenu.css';

export default function ContextMenu({
    task,
    taskID,
    isCompleteTask,
    setIsActiveMenuTask,
    completeTask,
    openEditorTask,
    setTitleTask,
    setBodyTask,
    deleteTask,
    setCurrentTaskID,
}) {
    // Выполнение задачи
    function closureTask() {
        completeTask(taskID);
        setIsActiveMenuTask(false);
    }
    // Редактирование задачи
    function editorTask(event) {
        event.stopPropagation();
        setCurrentTaskID(taskID)
        openEditorTask();
        setTitleTask(task.title);
        setBodyTask(task.body);
        setIsActiveMenuTask(false);
    }
    // Удаление задачи
    function delTask(event) {
        event.stopPropagation();
        deleteTask(taskID);
        setIsActiveMenuTask(false);
    }
    return (
        <ul className="context-menu__list">
            <li className="context-menu__list--item" onClick={() => closureTask()} style={(isCompleteTask) ? { display: 'none' } : {}}>Завершить</li>
            <li className="context-menu__list--item" onClick={(e) => editorTask(e)} style={(isCompleteTask) ? { display: 'none' } : {}}>Редактировать</li>
            <li className="context-menu__list--item" onClick={(e) => delTask(e)} style={(isCompleteTask) ? { border: 'none' } : {}}>Удалить</li>
        </ul>
    )
}