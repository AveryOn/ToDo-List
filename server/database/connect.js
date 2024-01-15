const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', { family: 4 });

async function startDB() {
    try {
        await client.connect();
        console.log('Connect success');
    } catch (err) {
        console.log(err);
    }
} 
const Tasks = client.db().collection('tasks');
module.exports = {Tasks, client, startDB};
