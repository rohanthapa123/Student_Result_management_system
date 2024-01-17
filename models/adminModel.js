const {pool} = require("../config/database")
class AdminModel{

    async insertAdminData(user_id){
        try {
            let [result] = await pool.query('INSERT INTO admin (user_id) VALUES (?)',[user_id]);
            return [result];
        } catch (error) {
            console.log("error at adminModel",error);
            throw error;
        }
    }
}

module.exports = new AdminModel();