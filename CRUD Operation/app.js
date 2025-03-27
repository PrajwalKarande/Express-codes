//CRUD Operations

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

tasks =[];
//get request
app.get('/tasks',(req,res)=>{
    res.status(200).json(tasks);
});

//post request
app.post('/addTask',(req,res)=>{
    if(!req.body.newTask){
        return res.status(400).json({error:"Task name is required"});
    }
    tasks.push(req.body.newTask);
    res.status(200).json(tasks);
});

//delete request
app.delete('/delete/:id',(req,res)=>{
    if(req.params.id >= tasks.length){
        return res.status(404).json({error:"Task not found"});
    }
    tasks.splice(req.params.id,1);
    res.status(200).json(tasks);
})

app.listen(port,()=>{
    console.log(`Server is running on  http://localhost:${port}`);  
})