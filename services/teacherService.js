const teacherModel = require('../models/teacherModel')
exports.insertTeacherData = async (user_id, subject_id) =>{
    try {
        const [result] = await teacherModel.insertTeacherData(user_id, subject_id);
        return result;
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}
exports.getAllTeachers = async () =>{
    try {
        const [result] = await teacherModel.getAllTeacher();
        return [result];
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}