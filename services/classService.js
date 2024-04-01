const classModel = require('../models/classModel')

exports.createClass = async (class_name, desc ,academic_year , subjects) =>{
    try {
        const result = await classModel.createClass(class_name, desc ,academic_year , subjects);
        return result
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}
exports.editClass = async (class_name, desc ,academic_year ,subjects, class_id) =>{
    try {
        const result = await classModel.editClass(class_name, desc ,academic_year, subjects, class_id);
        return result
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}
exports.getClass = async () =>{
    try {
        const [result] = await classModel.getClass();
        return [result]
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}
exports.getClassById = async (id) =>{
    try {
        const [result] = await classModel.getClassById(id);
        return [result]
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}
exports.deleteClassByID = async (class_id) =>{
    try {
        const [result] = await classModel.deleteClassByID(class_id);
        return [result]
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}