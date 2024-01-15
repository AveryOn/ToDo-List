const express = require('express');
const cors = require('cors');
const connect = require('./database/connect');
const {
    createTask,
    getTasks,
    completeTask,
    returnTask,
    editTask,
    deleteTask,
} = require('./controllers/taskControllers');
const bodyParser = require('body-parser');
const app = express();

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connect.startDB();

// Получение всех задач
app.get('/get-tasks', async (req, res) => {
    res.send(await getTasks());
});

// Создание задачи
app.post('/create-task', (req, res) => {
    const body = req.body;
    createTask(body);
    res.send({ status: true });
});

// Выполнение задачи
app.put('/complete-task', (req, res) => {
    const body = req.body;
    completeTask(body.taskID);
    res.send({ status: true });
});

// Возврат задачи в невыполненное состояние
app.put('/return-task', (req, res) => {
    const body = req.body;
    returnTask(body.taskID);
    res.send({ status: true });
});

// Редактирование задачи
app.put('/edit-task', (req, res) => {
    const body = req.body;
    editTask(body.taskID, body.taskTitle, body.taskBody);
    res.send({ status: true });
});

// Удаление задачи
app.post('/delete-task', (req, res) => {
    const body = req.body;
    deleteTask(body.taskID);
    res.send({ status: true });
});

app.listen(3000, () => {
    console.log('Порт запущен', 3000)
})