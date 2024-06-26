const teacherModel = require('../models/teacherModel')
exports.insertTeacherData = async (user_id, subject) =>{
    try {
        const [result] = await teacherModel.insertTeacherData(user_id);
        console.log(result.insertId)
        console.log(subject)
        return result;
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}
exports.updateTeacherData = async (user_id, subject_id) =>{
    try {
        const [result] = await teacherModel.updateTeacherData(user_id, subject_id);
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
exports.getTeacherById = async (id) =>{
    try {
        const [result] = await teacherModel.getTeacherById(id);
        return [result];
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}
exports.getTeacherClass = async (id) =>{
    try {
        const [result] = await teacherModel.getTeacherClass(id);
        return [result];
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}
exports.getTeacherSubject = async (id) =>{
    try {
        const [result] = await teacherModel.getTeacherSubject(id);
        return [result];
    } catch (error) {
        console.log("error in teacherService",error);
        throw error;
    }

}