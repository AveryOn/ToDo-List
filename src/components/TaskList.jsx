import React from "react";
import '../styles/TaskList.css';
import Task from "./UI/task";
import CreateTask from '../components/CreateTask';


export default function TaskList({ tasks, completeTask, completedTasks, isCompletedTasks, openTabs }) {
    let renderTasks;
    let renderCreateTaskTable;
    // Рендер задач выполненных задач
    if (isCompletedTasks) {
        renderTasks = completedTasks.map((task) =>
            <Task
                data={task}
                completeTask={completeTask}
                isCompletedTasks={isCompletedTasks}
                key={task.id}
                id={task.id}
            />
        )
    } else {
        // Рендер задач НЕ выполненных задач
        renderTasks = tasks.map((task) =>
            <Task
                data={task}
                completeTask={completeTask}
                isCompletedTasks={isCompletedTasks}
                key={task.id}
                id={task.id}
            />
        )
    }
    if (!tasks.length) {
        renderCreateTaskTable = <CreateTask />
    }
    return (
        <div className="task-list__parent">
            {renderCreateTaskTable}
            <button className="button-open-tabs" onClick={openTabs}>
                <span className="material-symbols-outlined">
                    density_medium
                </span>
            </button>
            <ul className="task-list">
                {renderTasks}
            </ul>
        </div>
    )
}