const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/api/exam', (req,res)=>{
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
