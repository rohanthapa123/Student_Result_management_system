const teacherModel = require('../models/teacherModel')
exports.insertTeacherData = async (user_id, subject) =>{
    try {
        const [result] = await teacherModel.insertTeacherData(user_id, subject);
        return result;
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}