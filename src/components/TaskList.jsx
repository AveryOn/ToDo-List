import React from "react";
import '../styles/TaskList.css';
import Task from "./UI/task";
import CreateTask from '../components/CreateTask';
import IsNotTasks from './IsNotTasks';

export default function TaskList({
    tasks,
    completeTask,
    completedTasks,
    isCompletedTasks,
    openTabs,
    createTask,
    isCreateNewTask,
    modeView,
    openEditorTask,
    titleTask,
    bodyTask,
    setTitleTask,
    setBodyTask,
    deleteTask,
    editTask,
    setCurrentTaskID,
    currentTaskID,
    isNotTasks,
    openCreateTask,
    openInProgressTasks,
    openIsNotTasks,
    closeIsNotTasks,
}) {
    let renderTasks;
    let renderCreateTaskTable;
    let renderIsNotTasks;
    // Рендеринг выполненных задач
    if (isCompletedTasks) {
        renderTasks = completedTasks.map((task) =>
            <Task
                data={task}
                completeTask={completeTask}
                isCompletedTasks={isCompletedTasks}
                deleteTask={deleteTask}
                key={task.id}
                id={task.id}
            />
        )
    } else {
        // Рендеринг задач НЕ выполненных задач
        renderTasks = tasks.map((task) =>
            <Task
                data={task}
                completeTask={completeTask}
                openEditorTask={openEditorTask}
                titleTask={titleTask}
                setTitleTask={setTitleTask}
                bodyTask={bodyTask}
                setBodyTask={setBodyTask}
                deleteTask={deleteTask}
                setCurrentTaskID={setCurrentTaskID}
                key={task.id}
                id={task.id}
            />
        )
    }
    // Рендеринг блока для создания и редактирования задач
    if (isCreateNewTask) {
        renderCreateTaskTable = <CreateTask
            createTask={createTask}
            modeView={modeView}
            titleTask={titleTask}
            setTitleTask={setTitleTask}
            bodyTask={bodyTask}
            setBodyTask={setBodyTask}
            editTask={editTask}
            currentTaskID={currentTaskID}
        />
    }
    if (isNotTasks) {
        renderIsNotTasks = <IsNotTasks
            modeView={modeView}
            openCreateTask={openCreateTask}
            openInProgressTasks={openInProgressTasks}
            openIsNotTasks={openIsNotTasks}
            closeIsNotTasks={closeIsNotTasks}
            tasks={tasks}
            completedTasks={completedTasks}
        />
    }
    return (
        <div className="task-list__parent">
            {renderIsNotTasks}
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