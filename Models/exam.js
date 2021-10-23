const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    name:{
        type:String,
    },
    duration: {
        type: Number,
    },
    instruction:{
        type: String,
    },
    questions: [{question: String, options: [String], answerPosition: Number}]
});

module.exports = mongoose.model('exam',examSchema);

//module.exports = exam;