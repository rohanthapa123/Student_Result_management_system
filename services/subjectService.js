const subjectModel = require('../models/subjectModel')

exports.createSubject = async (subject_name, subject_code, class_id) =>{
    try {
        const result = await subjectModel.createSubject(subject_name, subject_code,class_id);
        return result
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}
exports.editSubject = async (subject_name, subject_code, class_id, subject_id) =>{
    try {
        const result = await subjectModel.editSubject(subject_name, subject_code,class_id, subject_id);
        return result
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}
exports.getSubjects = async (id) =>{
    try {
        const [result] = await subjectModel.getSubjects(id);
        return [result]
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}
exports.getSubjectByClassId = async (class_id) =>{
    try {
        const [result] = await subjectModel.getSubjectByClassId(class_id);
        return [result]
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}
exports.getSubjectById = async (id) =>{
    try {
        const [result] = await subjectModel.getSubjectById(id);
        return [result]
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}
exports.deleteSubjectById = async (subject_id) =>{
    try {
        const [result] = await subjectModel.deleteSubjectById(subject_id);
        return [result]
    } catch (error) {
        console.log("Error at subjectService", error)
        throw error;
    }
}