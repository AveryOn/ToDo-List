import React from "react";
import MyInput from "./UI/input";
import '../styles/CreateTask.css';

export default function CreateTask() {
    return (
        <div className="create-task__parent">
            <form className="create-task__form">
                <h1 className="create-task__title">Создайте новую задачу!</h1>
                <div className="create-task__field--title">
                    <p className="field--title__title">Введите название задачи</p>
                    <MyInput value={null} onChange={false}></MyInput>
                </div>
                <div className="create-task__field--body">
                    <p className="field--title__body">Введите описание задачи</p>
                    <textarea
                        className="field--body__input"
                        cols="0"
                        rows='0'
                        value={null}
                        onChange={false}>

                    </textarea>
                </div>
            </form>
        </div>
    )
}