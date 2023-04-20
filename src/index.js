const express = require('express');
const path = require('path');

const app = express(); 
const port = 8000;


// console.log(path.join(__dirname,"../public"));
// const staticPath = path.join(__dirname,"../public");
//building middeleware
// app.use(express.static(staticPath));

//to set the view engine
app.set("view engine" , "hbs");
app.get('/', (req , res) =>{
    res.render("index");
});


app.get('/',(req, res) =>{
    res.send("you are in home page");
    
});

app.get('/about',(req,res) =>{
    res.send(" you are in about page");
});

app.listen('8000',() =>{
    console.log(` hyy i'm listening  at :${port}`);
    
})
