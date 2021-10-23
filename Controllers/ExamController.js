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
    static addQuestion = (req,res)=>{
        /*ExamModel.findOne(req.body.query)
        .then((result)=>{
            console.log(result);
            result.questions.push(req.body.data);
            result.save();
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })*/

        ExamModel.updateOne(req.body.query,{$push: req.body.data})
        .then((result)=>{
            res.send({
                isSuccessful: true,
                data:result
            });
        })
        .catch((err)=>{
            console.log(err);
        })
        /*ExamModel.findByIdAndUpdate(req.body.query,req.body.data)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })*/
    }
}

module.exports = examController;