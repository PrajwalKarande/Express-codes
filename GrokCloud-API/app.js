
const Groq = require('groq-sdk');//import groq-sdk
require('dotenv').config();//import dotenv
const express = require('express');//import express
const app = express();
const port = 3000;

app.use(express.json());//parse json

const groq = new Groq({ apiKey: process.env['GROQ_API_KEY'] });// 

app.post('/ask',async (req,res,next)=>{
    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: req.body.prompt,//user input
          },
        ],
        model: "llama-3.3-70b-versatile",
    });

    res.status(200).json({
        response: chatCompletion.choices[0].message.content
    });//response from the model
    
      
});

app.listen(port,()=>{
    console.log(`Server is running on  http://localhost:${port}`);
})
