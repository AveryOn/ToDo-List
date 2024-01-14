import React, { useEffect, useState } from 'react';
import randomUUID from './utils/randomUUID';
import MyNavbar from './components/navbar';
import TaskList from './components/TaskList';
import Tabs from './components/Tabs';
import './styles/App.css';
import gsap from 'gsap';

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

    if (tasks.length && modeView.current === 'not-complete') {
        gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 })
    }

    // Получение массива задач и сортировка их по массивам Выполненных и Не выполненных задач
    useEffect(() => {
        // let fetchingTasks = [
        //     { id: 'suehifes3254', title: 'Somthing To DO', body: 'example body', status: 'in progress', isComplete: false, },
        //     { id: 'glrs0kg4a', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: 'jsijef234gwreh', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '4389wyjsrgje', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: 'qasfg49w3aoe', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '489ew03ejgf', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '43j4w8jeigsw', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '4t93wjtisef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'complete', isComplete: true, },
        //     { id: 'lfweuaejfpzj', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: 'g9w803aoejgr', title: 'Somthing To DO_2', body: 'example body+@2', status: 'complete', isComplete: true, },
        //     { id: 'we9ghw93aoef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: 'gew003jgef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '43w90utghsjeg', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '3489w3thjssees', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        //     { id: '4t90q3j4growe', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        // ]
        let fetchingTasks = []

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

    }, []);
    // Отображает компонент-уведомление, что список задач пуст
    function openIsNotTasks(delay) {
        Promise.resolve(setIsNotTasks(true))
            .then(() => {
                gsap.to('.is-not-tasks', { scale: 1, duration: 0.5, delay: delay });
            });
    }
    // Скрывает компонент-уведомление, что список задач пуст
    function closeIsNotTasks() {
        Promise.resolve(gsap.to('.is-not-tasks', { scale: 0, duration: 0.5 }))
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
    function completeTask(taskID) {
        const task = document.getElementById(taskID);
        // Если выбран режим просмотра НЕ выполненных задач
        if (modeView.current === 'not-complete') {
            gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                .then(() => setTasks(tasks.filter((task) => {
                    if (taskID !== task.id) {
                        return true;
                    } else {
                        task.isComplete = true;
                        task.status = 'complete';
                        setCompletedTasks([task, ...completedTasks]);
                    }
                })));
        }
    }
    // Функция удаляет жестко задачу 
    function deleteTask(taskID) {
        const task = document.getElementById(taskID);
        if (modeView.current === 'complete') {
            gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                .then(() => {
                    setCompletedTasks([...completedTasks.filter(task => task.id !== taskID)])
                    if (completedTasks.length === 1) setIsNotTasks(true);
                })

        }
        else if (modeView.current === 'not-complete') {
            gsap.to(task, { left: '100%', duration: 0.4, delay: 0.15 })
                .then(() => setTasks([...tasks.filter(task => task.id !== taskID)]));
        }
    }
    // Функция создает задачу
    function createTask(titleTask, bodyTask) {
        console.log(titleTask, bodyTask);
        const newTask = {};
        newTask.id = randomUUID();
        newTask.title = titleTask;
        newTask.body = bodyTask;
        newTask.status = 'in progress';
        newTask.isComplete = false;
        setTasks([newTask, ...tasks]);
        return openInProgressTasks();
    }
    // Функция редактирует задачу
    function editTask(taskID) {
        tasks.forEach((task, index) => {
            if (taskID === task.id) {
                console.log('НАЙДЕН ', taskID, index);
                task.title = titleTask;
                task.body = bodyTask;
                const newTasks = tasks
                newTasks[index] = task;
                setTasks(newTasks);
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
        }
        gsap.to('.task-list', { scale: '0', duration: .7 })
        gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
        gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            .then(() => {
                setIsCompletedTasks(false);
            })
            .then(() => {
                openTabs()
                gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                    .then(() => setModeView({ title: 'Текущие задачи', current: 'not-complete' }))
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
        }
        gsap.to('.task-list', { scale: '0', duration: .7 })
        gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
        gsap.to('.task-list__parent', { width: '2%', duration: .7 })
            .then(() => {
                setIsCompletedTasks(true);
            })
            .then(() => {
                openTabs();
                gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                    .then(() => setModeView({ title: 'Выполненные задачи', current: 'complete' }))
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