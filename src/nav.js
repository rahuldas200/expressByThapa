const express = require('express');
const app = express();

app.get('/',(req, res) =>{
    res.write("hyy your are in home page");
    res.write("<h1>hyy your are in home page</h1>");
    res.send();

});

app.get('/about',(req, res) =>{
    res.json ([{
        id:1,
        name: "Rahul"
    },
    {
        id:1,
        name: "Rahul"
    }
    ,
    {
        id:1,
        name: "Rahul"
    }]);

});

app.get('/contact',(req, res) =>{
    res.status(200).send("hyy your are in contact page");

});
app.get('/temp',(req, res) =>{
    res.send("hyy your are in temp page");

});

app.listen('8000',()=>{
    console.log("cunnection successfully....at 8000 port ");
})