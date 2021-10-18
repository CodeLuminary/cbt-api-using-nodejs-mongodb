const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const UsersModel = require('./Models/users')
const dotenv = require('dotenv');
const userController = require('./Controllers/UserController')

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

dotenv.config();

const dbUri = process.env.DB_URL;
mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result=>{
    console.log("Connected to db")
}).catch(err=>console.log(err));

app.get('/add-users', (req,res)=>{
    /*const user = new UsersModel({
        name: "ijoni victor",
        email:'victorijoni@yahoo.com',
        password: '12345',
        isEnabled: true
    })*/
    userController.AddUser(req,res);
})
app.get('/all-users',(req,res)=>{
    userController.FindUsers(res)
})
app.get('/single-users',(req,res)=>{
    userController.FindSingleUser(req,res);
})
app.get('/delete-user',(req,res)=>{
    userController.DeleteUser(req,res);
})
app.get('/update-user',(req,res)=>{
    userController.UpdateUser(req,res);
})

app.get('/api/exam', (req,res)=>{
    
})
app.get('/admin/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'Static/admin.html'))
})
app.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,'Static/admin.html'))
})

app.all('/*',(req,res)=>{
    res.status(404).send({404: 'PAGE NOT FOUND!'})
})

if(process.env.NODE_ENV === 'production'){
    app.listen();
}
else{
    const port = process.env.PORT || 5000;
    app.listen(port, ()=>console.log(`Server started on port ${port}`));
}
