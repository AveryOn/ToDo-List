import React, { useState } from 'react';
import randomUUID from './utils/randomUUID';
import MyNavbar from './components/navbar';
import TaskList from './components/TaskList';
import Tabs from './components/Tabs';
import './styles/App.css';
import gsap from 'gsap';

const App = () => {
    let [tasks, setTasks] = useState([
        { id: '3fhrt-qw3rf-s6eas', title: 'Somthing To DO', body: 'example body', status: 'complete', isComplete: true, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '433k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: 'jh3k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '9dfk3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '9kga3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '9jmuhrt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93kdsft-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3tyjhfdt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qw3rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
        { id: '93k3rt-qt6rf-sjef', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },
    ]);
    const [completedTasks, setCompletedTasks] = useState([
        { id: 'qfgr435eyrutdhrge', title: 'Somthing To DO_2', body: 'example body+@2', status: 'in progress', isComplete: false, },

    ]);
    const [inputValue, setInputValue] = useState('');
    const [isCompletedTasks, setIsCompletedTasks] = useState(false);

    function handleInputChange(e) {
        setInputValue(e.target.value);
    };

    function addTask() {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    function deleteTask(index) {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    function openTabs() {
        gsap.to('.task-list', { width: '70%', left: '2%', duration: 1 });
        gsap.to('.tabs', { right: '2%', duration: 0.9, delay: 0.2 });
        console.log('hello');
    }
    function openCompletedTasks() {
        // gsap.to('.task-list', { width: '70%', left: '2%', duration: 1 });
        // gsap.to('.tabs', { right: '2%', duration: 0.9, delay: 0.2 });
        // gsap.to('.task', { right: '100%', duration: 0.9 })
        setIsCompletedTasks(true);
        // gsap.to('.task', { right: '0%', duration: 0.9, delay: 0.2 }) 
            // .then(() => {
            //     console.log(isCompletedTasks);
            // })
    }
    setTimeout(() => {
        openTabs();
    }, 1500)

    return (
        <div className='App' >
            <MyNavbar>ToDo List</MyNavbar>
            <TaskList tasks={tasks} isCompletedTasks={isCompletedTasks} deleteTask={deleteTask} />
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