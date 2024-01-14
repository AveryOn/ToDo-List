import React from "react";
import '../styles/Tabs.css'
import Tab from "./UI/tab";

export default function Tabs({
    openCompletedTasks,
    openCreateTask,
    openInProgressTasks,
}) {
    return (
        <div className="tabs">
            <ul>
                <Tab onClick={openInProgressTasks}>Текущие задачи</Tab>
                <Tab onClick={openCompletedTasks}>Выполненные задачи</Tab>
                <Tab onClick={openCreateTask}>Создать новую задачу</Tab>
            </ul>
        </div>
    )
}