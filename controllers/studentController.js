const studentModel = require("../models/studentModel")

exports.getAllStudents = async (req, res) =>{
    try {
        const [result] = await studentModel.getAllStudents();
        res.status(200).json({mesage:"student Data got successfully",data: result})
    } catch (error) {
        console.log(error,"Error at student controller");
        res.status(500).json({message: "Internal Server Error"})   
    }
}
exports.getStudentById = async (req, res) =>{
    try {
        const id = req.params.id;
        const [result] = await studentModel.getStudentById(id);
        res.status(200).json({mesage:"student Data got successfully",data: result})
    } catch (error) {
        console.log(error,"Error at student controller");
        res.status(500).json({message: "Internal Server Error"})   
    }
}