const classModel = require('../models/classModel')

exports.createClass = async (class_name, _class) =>{
    try {
        const result = await classModel.createClass(class_name, _class);
        return result
    } catch (error) {
        console.log("Error at classService", error)
        throw error;
    }
}
exports.editClass = async (class_name, _class , class_id) =>{
    try {
        const result = await classModel.editClass(class_name, _class, class_id);
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