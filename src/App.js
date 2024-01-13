import React, { useEffect, useState } from 'react';
import randomUUID from './utils/randomUUID';
import MyNavbar from './components/navbar';
import TaskList from './components/TaskList';
import Tabs from './components/Tabs';
import './styles/App.css';
import gsap from 'gsap';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isCompletedTasks, setIsCompletedTasks] = useState(false);
    const [isOpenTabs, setInOpenTabs] = useState(false);
    const [modeView, setModeView] = useState({ title: 'Текущие задачи', current: 'not-complete', alaviable: ['not-complete', 'complete'] })

    if (tasks.length && modeView.current === 'not-complete') {
        gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 })
    }
    if (!tasks.length) {
        gsap.to('.create-task__parent', { right: '25%', bottom: '10%', left: '25%', top: '10%', scale: 1, duration: 0.8, delay: .5 })
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
    }, []);

    function handleInputChange(e) {
        setInputValue(e.target.value);
    };

    function addTask() {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    // Активирует форму для создания задачи
    function showCreateTask() {

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
                        setCompletedTasks([...completedTasks, task]);
                    }
                })));
        }
    }

    function openCompletedTasks() {
        if (modeView.current !== 'complete') {
            gsap.to('.task-list', { scale: '0', duration: .7 })
            gsap.to('.button-open-tabs', { scale: '0', duration: .7 })
            gsap.to('.task-list__parent', { width: '2%', duration: .7 })
                .then(() => {
                    setIsCompletedTasks(true);
                })
                .then(() => {
                    gsap.to('.navbar__mode-view', { right: '-100%', duration: 0.5 })
                    gsap.to('.task-list__parent', { width: '70%', duration: .5, delay: 0.1 })
                    gsap.to('.button-open-tabs', { scale: '1', duration: .5, delay: 0.1 })
                    gsap.to('.task-list', { scale: '1', duration: .5, delay: 0.1 })
                })
                .then(() => setModeView({ title: 'Выполненные задачи', current: 'complete' }))
                .then(() => {
                    gsap.to('.navbar__mode-view', { right: '0%', duration: 0.7, delay: 0.5 })
                })
        }
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
            />
            <Tabs openCompletedTasks={openCompletedTasks}></Tabs>
            {/* <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={addTodo}>Add</button> */}

        </div>
    );
};

export default App;