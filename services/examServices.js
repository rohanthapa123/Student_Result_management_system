const examModel = require('../models/examModel')

exports.createExam = async (exam_name,class_id, subject_id,exam_date) =>{
    try {
        const result = await examModel.createExam(exam_name,class_id, subject_id,exam_date);
        return result
    } catch (error) {
        console.log("Error at examService", error)
        throw error;
    }
}
exports.getExams = async () =>{
    try {
        const [result] = await examModel.getExams();
        return [result]
    } catch (error) {
        console.log("Error at examService", error)
        throw error;
    }
}
exports.getExamByClassId = async (class_id) =>{
    try {
        const [result] = await examModel.getExamByClassId(class_id);
        return [result]
    } catch (error) {
        console.log("Error at examService", error)
        throw error;
    }
}
exports.deleteExamById = async (exam_id) =>{
    try {
        const [result] = await examModel.deleteExamById(exam_id);
        return [result]
    } catch (error) {
        console.log("Error at examService", error)
        throw error;
    }
}