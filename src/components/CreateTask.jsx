import React, { useEffect, useState } from "react";
import MyInput from "./UI/input";
import '../styles/CreateTask.css';

export default function CreateTask({ 
    modeView, 
    createTask, 
    titleTask,
    bodyTask,
    setTitleTask,
    setBodyTask,
    editTask,
    currentTaskID,
}) {
    function confirm() {
        if (modeView.current === 'creation') createNewTask();
        else if (modeView.current === 'edit') edTask();
    }
    // Создание новой задачи
    function createNewTask() {
        createTask(titleTask, bodyTask);
        setBodyTask('')
        setTitleTask('')
    }
    // Редактирование задачи
    function edTask() {
        editTask(currentTaskID);
    }
    return (
        <div className="create-task__parent">
            <form className="create-task__form" onSubmit={e => e.preventDefault()}>
                <h1 className="create-task__title">{(modeView.current === 'creation') ? 'Создайте новую задачу!' : 'Редактирование задачи'}</h1>
                {/* НАЗВАНИЕ ЗАДАЧИ */}
                <div className="create-task__field--title">
                    <p className="field--title__title">{(modeView.current === 'creation') ? 'Введите название задачи' : 'Измените название задачи'}</p>
                    <MyInput value={titleTask} onChange={setTitleTask}></MyInput>
                </div>
                {/* ОПИСАНИЕ ЗАДАЧИ */}
                <div className="create-task__field--body">
                    <p className="field--title__body">{(modeView.current === 'creation') ? 'Введите описание задачи' : 'Измените описание задачи'}</p>
                    <textarea
                        className="field--body__input"
                        cols="0"
                        rows='0'
                        value={bodyTask}
                        onChange={e => setBodyTask(e.target.value)}>
                    </textarea>

                </div>
                <button
                    className="create-task__button"
                    onClick={() => confirm()}
                >
                    {(modeView.current === 'creation') ? 'Создать' : 'Подтвердить'}
                </button>
            </form>
        </div>
    )
}