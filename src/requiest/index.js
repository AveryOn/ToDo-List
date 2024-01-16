import axios from "axios";

const hostName = 'http://localhost:8080';

// Получение всех списка задач
async function getTasksDB() {
    try {
        const { data } = await axios.get(hostName + '/get-tasks');
        return data;
    } catch (err) {
        throw err;
    }
}

// Создание задачи
function createTaskDB(id, title, body, status, isComplete) {
    try {
        axios.post(hostName + '/create-task', {
            id,
            title,
            body,
            status,
            isComplete
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response?.data;
        }).catch((err) => console.log(err))
    } catch (err) {
        console.log(err);
    }
}

// Выполнение задачи
async function completeTaskDB(taskID) {
    try {
        const { data } = await axios.put(hostName + '/complete-task', {
            taskID
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Возврат задачи в невыполненное состояние
async function returnTaskDB(taskID) {
    try {
        const { data } = await axios.put(hostName + '/return-task', {
            taskID
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return data;
    } catch (err) {
        console.log(err);
    }
}
// Редактирование задачи
async function editTaskDB(taskID, taskTitle, taskBody) {
    try {
        const { data } = await axios.put(hostName + '/edit-task', {
            taskID,
            taskTitle,
            taskBody,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return data;
    } catch (err) {
        console.log(err);
    }
}
// Удаление задачи
async function deleteTaskDB(taskID) {
    try {
        const { data } = await axios.post(hostName + '/delete-task', {
            taskID,
        });
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {
    getTasksDB,
    createTaskDB,
    completeTaskDB,
    returnTaskDB,
    editTaskDB,
    deleteTaskDB
}