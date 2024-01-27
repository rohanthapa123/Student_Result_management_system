const { pool } = require("../config/database");


class ClassModel{
    async createClass(class_name, _class){
        try {
            const [result] = await pool.query('INSERT INTO class (class_name, class) VALUES (?, ?)',[class_name ,_class]);
            // console.log(result)
            return result;
        } catch (error) {
            console.log("error at classModel", error);
            throw error;
        }
    }
    async getClass(){
        try {
            const [result] = await pool.query('SELECT * FROM class');
            // console.log(result)
            return [result];
        } catch (error) {
            console.log("error at classModel", error);
            throw error;
        }
    }
    async deleteClassByID(class_id){
        try {
            const [result] = await pool.query('DELETE FROM class WHERE class_id = ?',[class_id]);
            // console.log(result)
            return [result];
        } catch (error) {
            console.log("error at classModel", error);
            throw error;
        }
    }
}

module.exports = new ClassModel();