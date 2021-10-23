const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    instruction:{
        type: String,
        required: true
    },
    questions: [{question: String, options: [String], answerPosition: Number}]
});

module.exports = mongoose.model('exam',examSchema);

//module.exports = exam;