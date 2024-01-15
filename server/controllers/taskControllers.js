const { Tasks, client } = require('../database/connect');

// Функция получает список всех задач
client.connect();
async function getTasks() {
    try {
        return await Tasks.find({}).toArray();
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}
// Функция создает новую задачу
async function createTask(task) {
    try {
        task.isComplete = Boolean(task.isCompleted);
        await Tasks.insertOne(task);
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}
// Функция меняет статус задачи на ВЫПОЛНЕНА
async function completeTask(taskID) {
    try {
        await Tasks.updateOne(
            { id: taskID },
            { $set: { status: 'завершена!', isComplete: true } },
        );
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}
// Функция меняет статус задачи на В ПРОЦЕССЕ
async function returnTask(taskID) {
    try {
        await Tasks.updateOne(
            { id: taskID },
            { $set: { status: 'в процессе', isComplete: false } },
        );
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}
// Функция меняет статус задачи на В ПРОЦЕССЕ
async function editTask(taskID, taskTitle, taskBody) {
    try {
        await Tasks.updateOne(
            { id: taskID },
            { $set: { title: taskTitle, body: taskBody } },
        );
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}
// Функция удаляет задачу
async function deleteTask(taskID) {
    try {
        await Tasks.deleteOne({ id: taskID })
    } catch (err) {
        throw err;
    } finally {
        // client.close();
    }
}

module.exports = {
    createTask,
    getTasks,
    completeTask,
    returnTask,
    editTask,
    deleteTask,
}