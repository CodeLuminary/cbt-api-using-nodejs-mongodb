const UsersModel = require('../Models/users.js');
const jwt = require('jsonwebtoken');
class userController{
    static AddUser = (req,res) =>{const dis = this;
        const user = new UsersModel(req.body);
        user.save()
        .then(()=>{
            dis.FindUsers(res);
        })
        .catch((err)=>{
            console.log(err);
            res.send({
                isSuccessful: false,
                data: err
            })
        })
    }
    static FindUsers = (res)=>{
        UsersModel.find()
        .then((result)=>{
            res.send({
                isSuccessful: true,
                data:result
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    static FindSingleUser = (req,res)=>{
        UsersModel.findById(req.body)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    static FindUser = (req,res)=>{
        UsersModel.findOne(req.body.query)
        .then((result)=>{
            jwt.sign({user:result}, 'secretkey', {expiresIn: '600'}, (err,token)=>{
                res.send({
                    isSuccessful: true,
                    token: token
                })
            }) 
        })
        .catch((err)=>console.log(err))  
    }
    static FindOneUser = (req,res)=>{
        UsersModel.findOne(req.body.query)
        .then((result)=>{
            res.send({
                isSuccessful: true,
                data:result
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    static DeleteUser = (req,res) =>{const dis = this;
        UsersModel.findByIdAndDelete(req.body.id)
        .then(()=>{
            dis.FindUsers(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    static UpdateUser = (req,res) =>{
        UsersModel.findByIdAndUpdate(req.body.query,req.body.data)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

module.exports = userController;