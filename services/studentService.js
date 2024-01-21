const StudentModel = require('../models/studentModel')

exports.insertStudentData = async (user_id,class_id,section_id,blood_group,nationality) =>{
    try {
        const admission_id = user_id + "_" + class_id +"_" + section_id ;
        const result = await StudentModel.insertStudentData(user_id,class_id,section_id,blood_group,nationality,admission_id);
        return result;
    } catch (error) {
        console.log("Error in student Service",error);
        throw error;
    }
}