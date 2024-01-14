import React from "react";
import '../styles/IsNotTasks.css';

export default function IsNotTasks({
    modeView,
    openCreateTask,
    openInProgressTasks,
    openIsNotTasks,
    closeIsNotTasks,
    tasks,
    completedTasks,
}) {
    function confirm() {
        if (modeView.current === 'complete') {
            openInProgressTasks()
        }
        else if (modeView.current === 'not-complete') {
            openCreateTask()
        }
    }
    return (
        <div className="is-not-tasks">
            <h1 className="is-not-tasks__title">
                {(modeView.current === 'complete') ? 'Здесь будут отображаться выполненные задачи' : 'У вас пока нет задач'}
            </h1>
            <button className="is-not-tasks__button" onClick={() => confirm()}>
                {(modeView.current === 'complete') ? 'Вернуться к текущим задачам' : 'Создать новую задачу'}
            </button>
        </div>
    )
}