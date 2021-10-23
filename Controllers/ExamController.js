const ExamModel = require('../Models/exam.js');
class examController{
    static addExam = (req,res)=>{
        const exam = new ExamModel(req.body);
        exam.save()
        .then((result)=>{
            res.send({
                isSuccessful: true,
                data:result
            });
        })
        .catch((err)=>{
            console.log(err);
            res.send({
                isSuccessful: false,
                data: err
            })
        })
    }
    static getExams = (req,res) =>{
        ExamModel.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

module.exports = examController;