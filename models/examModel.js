const { pool } = require("../config/database");

class ExamModel{
    async createExam(exam_name,class_id, subject_id,exam_date, term){
        try {
            const [result] = await pool.query("INSERT INTO exam (exam_name, class_id, subject_id, exam_date, term) VALUES (?,?,?,?,?)",[exam_name,class_id,subject_id,exam_date,term])
            return [result]
        } catch (error) {
            console.log("Error at exam model",error);
            throw error;
        }
    }
    async deleteExamById(exam_id){
        try {
            const [result] = await pool.query("DELETE FROM exam WHERE exam_id = ?",[exam_id])
            return [result]
        } catch (error) {
            console.log("Error at exam model",error);
            throw error;
        }
    }
    async getExams(){
        try {
            const [result] = await pool.query(" SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id")
            return [result]
        } catch (error) {
            console.log("Error at exam model",error);
            throw error;
        }
    }
    async getExamByClassId(class_id){
        try {
            const [result] = await pool.query(" SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id WHERE exam.class_id = ?",[class_id])
            return [result]
        } catch (error) {
            console.log("Error at exam model",error);
            throw error;
        }
    }
    async getExamOfTeacherClass(user_id){
        try {
            const [result] = await pool.query("  SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id where exam.class_id = (select subject.class_id from teacher inner join subject on teacher.subject_id = subject.subject_id where teacher_id = (select teacher_id from user inner join teacher on user.user_id = teacher.user_id where user.user_id = ?)); ",[user_id])
            return [result]
        } catch (error) {
            console.log("Error at exam model",error);
            throw error;
        }
    }
}

module.exports = new ExamModel()