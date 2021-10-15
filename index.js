const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const UsersModel = require('./Models/users')

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

const dbUri = 'mongodb+srv://admin:Richesbrainz1@codeluminary.gpnyp.mongodb.net/cbt?retryWrites=true&w=majority';
/*mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result=>{
    console.log("Connected to db")
}).catch(err=>console.log(err));*/

app.get('/get-users', (req,res)=>{
    const user = new UsersModel({
        name: "ijoni victor",
        email:'victorijoni@yahoo.com',
        password: '12345',
        isEnabled: true
    })
    user.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/all-users',(req,res)=>{
    UsersModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/single-users/:id',(req,res)=>{
    UsersModel.findById('61695a154148859bd4f026ba')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
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
