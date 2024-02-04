const { pool } = require("../config/database");


class SubjectModel{
    async createSubject(subject_name, subject_code, class_id){
        try {
            const [result] = await pool.query('INSERT INTO subject (subject_name, subject_code, class_id) VALUES (? ,?, ?)',[subject_name ,subject_code, class_id]);
            // console.log(result)
            return result;
        } catch (error) {
            console.log("error at subjectModel", error);
            throw error;
        }
    }
    async getSubjects(){
        try {
            const [result] = await pool.query(' select subject.*,class_name from subject inner join class where subject.class_id = class.class_id');
            // console.log(result)
            return [result];
        } catch (error) {
            console.log("error at subjectModel", error);
            throw error;
        }
    }
    async getSubjectByClassId(class_id){
        try {
            const [result] = await pool.query('select subject.*,class_name from subject inner join class on subject.class_id = class.class_id  where subject.class_id = ?',[class_id]);
            // console.log(result)
            return [result];
        } catch (error) {
            console.log("error at subjectModel", error);
            throw error;
        }
    }
    async deleteSubjectById(subject_id){
        try {
            const [result] = await pool.query('DELETE FROM subject WHERE subject_id = ?',[subject_id]);
            // console.log(result)
            return [result];
        } catch (error) {
            console.log("error at subjectModel", error);
            throw error;
        }
    }
}

module.exports = new SubjectModel();