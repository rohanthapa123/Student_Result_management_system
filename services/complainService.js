const complainModel = require("../models/complainModel")

exports.getComplain = async () =>{
    try {
        const [result] = await complainModel.getComplain();
        // console.log(result)
        return [result];
    } catch (error) {
        console.log("Error at complainServices",error);
        throw error;
    }
}
exports.getMyComplain = async (user_id) =>{
    try {
        const [result] = await complainModel.getMyComplain(user_id);
        // console.log(result)
        return [result];
    } catch (error) {
        console.log("Error at complainServices",error);
        throw error;
    }
}
exports.deleteComplain = async (id) =>{
    try {
        const resp = await complainModel.deleteComplain(id);
        return resp;
    } catch (error) {
        console.log("Error at complainServices",error);
        throw error;
    }
}

exports.createComplain = async (complain_data) =>{
    try {
        const [result] = await complainModel.addComplain(complain_data);
        return [result];
    } catch (error) {
        console.log("Error at complainServices",error);
        throw error;
    }
}
exports.solveComplain = async (complain_id) =>{
    try {
        const [result] = await complainModel.solveComplain(complain_id);
        return [result];
    } catch (error) {
        console.log("Error at complainServices",error);
        throw error;
    }
}