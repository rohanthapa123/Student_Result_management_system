const teacherService = require("../services/teacherService")

exports.getAllTeacher = async (req, res) =>{
    try {
        const [result] = await teacherService.getAllTeachers();
        res.status(200).json({data: result});
    } catch (error) {
        console.log("Error at teacherContrlller",error);
        res.status(500).json({message: error})
    }
}
exports.getTeacherById = async (req, res) =>{
    try {
        const id = req.params.id;
        const [result] = await teacherService.getTeacherById(id);
        res.status(200).json({data: result});
    } catch (error) {
        console.log("Error at teacherContrlller",error);
        res.status(500).json({message: error})
    }
}