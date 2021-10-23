const UsersModel = require('../Models/users.js');
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