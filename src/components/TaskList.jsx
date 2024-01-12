import React from "react";
import '../styles/TaskList.css';
import Task from "./UI/task";

export default function TaskList({ tasks, deleteTask, isCompletedTasks }) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <Task
                    data={task}
                    deleteTask={deleteTask}
                    key={task.id}
                />
            ))}
        </ul>
    )
}