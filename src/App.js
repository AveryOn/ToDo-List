import React, { useEffect, useState } from 'react';
import MyNavbar from './components/navbar';
import TaskList from './components/TaskList';
import Tabs from './components/Tabs';
import './styles/App.css';
import {
    createTaskDB,
    getTasksDB,
    completeTaskDB,
    returnTaskDB,
    editTaskDB,
    deleteTaskDB,
} from './requiest';
import gsap from 'gsap';
import randomUUID from './utils/randomUUID';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTaskID, setCurrentTaskID] = useState(null);
    const [titleTask, setTitleTask] = useState('');
    const [bodyTask, setBodyTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isCompletedTasks, setIsCompletedTasks] = useState(false);
    const [isOpenTabs, setInOpenTabs] = useState(false);
    const [modeView, setModeView] = useState({ title: 'Текущие задачи', current: 'not-complete', alaviable: ['not-complete', 'complete', 'creation', 'edit'] })
    const [isCreateNewTask, setIsCreateNewTask] = useState(false);
    const [isNotTasks, setIsNotTasks] = useState(false);
    const [lengthTasks, setLengthTasks] = useState({ completedTasks: 0, tasks: 0 })

    if (tasks.length && modeView.current === 'not-complete') {
        gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 })
    }

    // Получение массива задач и сортировка их по массивам Выполненных и Не выполненных задач
    useEffect(() => {
        let fetchingTasks = [];
        getTasksDB().then((responseTasks) => {
            fetchingTasks = responseTasks?.reverse();
        }, (err) => console.log(err))
            .then(() => {
                const notCompleted = fetchingTasks.filter((task) => {
                    if (!task.isComplete) return true;
                    else return false;
                })
                const completed = fetchingTasks.filter((task) => {
                    if (task.isComplete) return true;
                    else return false;
                })
                setTasks(notCompleted);
                setCompletedTasks(completed);
                if (!notCompleted.length) {
                    openIsNotTasks();
                }
            })
    }, []);
    // Отображает компонент-уведомление, что список задач пуст
    function openIsNotTasks() {
        Promise.resolve(setIsNotTasks(true))
            .then(() => {
                gsap.to('.is-not-tasks__container', { scale: 1, duration: 0.5 });
            });
    }
    // Скрывает компонент-уведомление, что список задач пуст
    function closeIsNotTasks() {
        Promise.resolve(gsap.to('.is-not-tasks__container', { scale: 0, duration: 0.4 }))
            .then(() => {
                setIsNotTasks(false);
            });
    }
    // Отображает форму для создания задачи
    function openCreateTask() {
        if (!tasks.length) {
            closeIsNotTasks();
        }
        setTitleTask('');
        setBodyTask('');
        if (modeView.current !== 'creation') {
            if (isCreateNewTask) {
                gsap.to('.create-task__parent', { right: '100%', bottom: '100%', left: '', top: '', opacity: 0, duration: 0.6 })
            }
            gsap.to('.task-list', { scale: '0', duration: .7 })
            gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
            gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                .then(() => {
                    setModeView({ title: 'Создание задачи', current: 'creation' });
                    if (isOpenTabs) {
                        openTabs();
                    } else {
                        gsap.to('.task-list__parent', { width: '92%', left: '4%', duration: 1 })
                            .then(() => setInOpenTabs(false))
                    }
                    gsap.to('.button-open-tabs', { scale: '1', duration: .5, delay: 0.1 })
                })
                .then(() => setIsCreateNewTask(true))
                .then(() => {
                    setTimeout(() => {
                        gsap.to('.create-task__parent', { right: '25%', bottom: '10%', left: '25%', top: '10%', scale: 1, opacity: 1, duration: 0.8, delay: 0.3 })
                    }, 0)
                })
                .then(() => gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 }))
        }
    }
    // Отображает форму для Редактирования задачи
    function openEditorTask() {
        if (modeView.current !== 'edit') {
            gsap.to('.task-list', { scale: '0', duration: .7 })
            gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
            gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                .then(() => {
                    setModeView({ title: 'Редактирование задачи', current: 'edit' });
                    if (isOpenTabs) {
                        openTabs();
                    } else {
                        gsap.to('.task-list__parent', { width: '92%', left: '4%', duration: 1 })
                            .then(() => setInOpenTabs(false));
                    }
                    gsap.to('.button-open-tabs', { scale: '1', duration: .5, delay: 0.1 })
                })
                .then(() => setIsCreateNewTask(true))
                .then(() => {
                    setTimeout(() => {
                        gsap.to('.create-task__parent', { right: '25%', bottom: '10%', left: '25%', top: '10%', scale: 1, duration: 0.8 })
                    }, 0)
                })
                .then(() => gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 }))
        }
    }
    // Открывает панель вкладок (Меню)
    function openTabs() {
        if (!isOpenTabs) {
            gsap.to('.task-list__parent', { width: '70%', left: '2%', duration: 1 });
            gsap.to('.tabs', { right: '2%', duration: 0.9 })
                .then(() => setInOpenTabs(true));
        } else {
            gsap.to('.tabs', { right: '-50%', duration: 2 });
            gsap.to('.task-list__parent', { width: '92%', left: '4%', duration: 1 })
                .then(() => setInOpenTabs(false));
        }
    }
    // Функция определяет выбранную задачу как выполненную. Анимация выполнения задачи
    async function completeTask(taskID) {
        const response = await completeTaskDB(taskID);
        if (response.status === true) {
            const task = document.getElementById(taskID);
            // Если выбран режим просмотра НЕ выполненных задач
            if (modeView.current === 'not-complete') {
                gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                    .then(() => setTasks(tasks.filter((task) => {
                        if (taskID !== task.id) {
                            return true;
                        } else {
                            task.isComplete = true;
                            task.status = 'завершена!';
                            setCompletedTasks([task, ...completedTasks]);
                        }
                    })))
                    .then(() => {
                        if (tasks.length === 1) {
                            openIsNotTasks();
                        }
                    })
            }
        }
    }
    // Функция возвращает меняет статус задачи на не выполненный. Возвращает задачу в массив текущих задач
    async function returnTask(taskID) {
        const response = await returnTaskDB(taskID);
        if (response.status === true) {
            const task = document.getElementById(taskID);
            // Если выбран режим просмотра НЕ выполненных задач
            if (modeView.current === 'complete') {
                gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                    .then(() => setCompletedTasks(completedTasks.filter((task) => {
                        if (taskID !== task.id) {
                            return true;
                        } else {
                            task.isComplete = false;
                            task.status = 'в процессе';
                            setTasks([task, ...tasks]);
                        }
                    })))
                    .then(() => {
                        if (completedTasks.length === 1) {
                            openIsNotTasks();
                        }
                    })

            }
        }
    }
    // Функция удаляет жестко задачу 
    function deleteTask(taskID) {
        const task = document.getElementById(taskID);
        if (modeView.current === 'complete') {
            gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                .then(async () => {
                    const response = await deleteTaskDB(taskID);
                    if (response.status === true) {
                        setCompletedTasks([...completedTasks.filter(task => task.id !== taskID)])
                        if (completedTasks.length === 1) setIsNotTasks(true);
                    }
                })
                .then(() => {
                    if (completedTasks.length === 1) {
                        openIsNotTasks();
                    }
                })
        }
        else if (modeView.current === 'not-complete') {
            gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                .then(async () => {
                    const response = await deleteTaskDB(taskID);
                    if (response.status === true) {
                        setTasks([...tasks.filter(task => task.id !== taskID)]);
                    }
                })
                .then(() => {
                    if (tasks.length === 1) {
                        openIsNotTasks();
                    }
                })
        }
    }
    // Функция создает задачу
    async function createTask(titleTask, bodyTask) {
        const newTask = {};
        newTask.id = randomUUID();
        newTask.title = titleTask;
        newTask.body = bodyTask;
        newTask.status = 'в процессе';
        newTask.isComplete = false;
        try {
            const response = await createTaskDB(...Object.values(newTask));
        } catch (err) {
            console.log(err);
        }
        setTasks([newTask, ...tasks]);
        return openInProgressTasks();
    }
    // Функция редактирует задачу
    function editTask(taskID) {
        tasks.forEach(async (task, index) => {
            if (taskID === task.id) {
                task.title = titleTask;
                task.body = bodyTask;
                const newTasks = tasks
                newTasks[index] = task;
                const response = await editTaskDB(taskID, titleTask, bodyTask);
                if (response.status === true) {
                    setTasks(newTasks);
                }
                return;
            }
        })
        openInProgressTasks();
        setCurrentTaskID(null);
    }
    // Функция показывает список задач в процессе (НЕ выполненных)
    function openInProgressTasks() {
        if (modeView.current === 'not-complete') return;
        if (isCreateNewTask) {
            gsap.to('.create-task__parent', { right: '100%', bottom: '100%', left: '', top: '', scale: 0, duration: 0.6 })
            closeIsNotTasks();
        }
        closeIsNotTasks();
        gsap.to('.task-list', { scale: '0', duration: .7 })
        gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
        gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            .then(() => {
                setIsCompletedTasks(false);
            })
            .then(() => {
                if (isOpenTabs) {
                    openTabs();
                } else {
                    gsap.to('.task-list__parent', { width: '92%', left: '4%', duration: 1 })
                        .then(() => setInOpenTabs(false))
                }
                gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                    .then(() => setModeView({ title: 'Текущие задачи', current: 'not-complete' }))
                    .then(() => {
                        if (!tasks.length && modeView.current !== 'creation') {
                            openIsNotTasks();
                        }
                    })
                gsap.to('.button-open-tabs', { scale: '1', duration: .5, delay: 0.1 })
                gsap.to('.task-list', { scale: '1', duration: .5, delay: 0.1 })
            })
            .then(() => {
                setTimeout(() => {
                    gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 })
                }, 0)
            })
    }
    // Функция показывает список выполненных задач 
    function openCompletedTasks() {
        if (modeView.current === 'complete') return;
        if (isCreateNewTask) {
            gsap.to('.create-task__parent', { right: '100%', bottom: '100%', left: '', top: '', scale: 0, duration: 0.6 })
            closeIsNotTasks();
        }
        closeIsNotTasks();
        gsap.to('.task-list', { scale: '0', duration: .7 })
        gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
        gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            .then(() => {
                setIsCompletedTasks(true);
            })
            .then(() => {
                if (isOpenTabs) {
                    openTabs();
                } else {
                    gsap.to('.task-list__parent', { width: '92%', left: '4%', duration: 1 })
                        .then(() => setInOpenTabs(false))

                }
                gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                    .then(() => setModeView({ title: 'Выполненные задачи', current: 'complete' }))
                    .then(() => {
                        if (!completedTasks.length && modeView.current !== 'creation' || modeView.current !== 'not-complete') {
                            openIsNotTasks();
                        }
                    })
                gsap.to('.button-open-tabs', { scale: '1', duration: .5, delay: 0.1 })
                gsap.to('.task-list', { scale: '1', duration: .5, delay: 0.1 })
            })
            .then(() => gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 }))
    }
    return (
        <div className='App' >
            <MyNavbar modeView={modeView}></MyNavbar>
            <TaskList
                tasks={tasks}
                completedTasks={completedTasks}
                isCompletedTasks={isCompletedTasks}
                completeTask={completeTask}
                openTabs={openTabs}
                createTask={createTask}
                isCreateNewTask={isCreateNewTask}
                modeView={modeView}
                openEditorTask={openEditorTask}
                titleTask={titleTask}
                setTitleTask={setTitleTask}
                bodyTask={bodyTask}
                setBodyTask={setBodyTask}
                deleteTask={deleteTask}
                editTask={editTask}
                currentTaskID={currentTaskID}
                setCurrentTaskID={setCurrentTaskID}
                isNotTasks={isNotTasks}
                openCreateTask={openCreateTask}
                openInProgressTasks={openInProgressTasks}
                openIsNotTasks={openIsNotTasks}
                closeIsNotTasks={closeIsNotTasks}
                setLengthTasks={setLengthTasks}
                lengthTasks={lengthTasks}
                returnTask={returnTask}
            />
            <Tabs
                openCompletedTasks={openCompletedTasks}
                openCreateTask={openCreateTask}
                openInProgressTasks={openInProgressTasks}
            ></Tabs>
        </div>
    );
};

export default App;