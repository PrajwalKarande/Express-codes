const express = require('express');
const sql = require('./db.js'); // Import the sql object from db.js

const app = express();

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());

sql`create table if not exists tasks(id serial,task varchar(255))`.then(() => {
    console.log('Table created');
}).catch((error)=>{console.log(error)});

app.get('/tasks',(req,res)=>{
    sql`select * from tasks`.then((tasks)=>{
        res.status(200).json(tasks);
    }).catch((error)=>{
        console.log(error);
        res.status(500).send('Error retrieving tasks');
    });
})

app.post('/addTask',(req,res)=>{
    const task = req.body.task;
    sql`insert into tasks (task) values (${task})`.then(()=>{
        res.status(200).send('Task added successfully');
    }).catch((error)=>{
        console.log(error);
        res.status(500).send('Error adding task');
    })
})

app.delete('/deleteTask/:id',(req,res)=>{
    const id = req.params.id;
    sql`delete from tasks where id = ${id}`.then(()=>{
        res.status(200).send('Task deleted successfully');
    }).catch((error)=>{
        console.log(error);
        res.status(500).send('Error deleting task');
    })
})



