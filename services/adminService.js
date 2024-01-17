const adminModel = require('../models/adminModel')
exports.insertAdminData = async (user_id) =>{
    try {
        const [result] = await adminModel.insertAdminData(user_id);
    } catch (error) {
        console.log("error in adminService",error);
        throw error;
    }

}