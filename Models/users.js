const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    isEnabled:{
        type: Boolean,
    }
})
const Users = mongoose.model('cbtusers',userSchema);

module.exports = Users;