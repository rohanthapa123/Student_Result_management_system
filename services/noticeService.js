const noticeModel = require("../models/noticeModel")
const dateTimeUtil = require("../utils/dateTimeUtil")

exports.getOpenNotice = async () =>{
    try {
        const [result] = await noticeModel.getOpenNotice();
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}
exports.getNotice = async () =>{
    try {
        const [result] = await noticeModel.getNotice();
        // console.log(result)
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}
exports.getNoticeById = async (id) =>{
    try {
        const [result] = await noticeModel.getNoticeById(id);
        // console.log(result)
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}
exports.getNoticeByClass = async (user_id) =>{
    try {
        const [result] = await noticeModel.getNoticeByClass(user_id);
        // console.log(result)
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}
exports.deleteNotice = async (id) =>{
    try {
        const resp = await noticeModel.deleteNotice(id);
        return resp;
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}

exports.createNotice = async (notice_data) =>{
    try {
        const [result] = await noticeModel.addNotice(notice_data);
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}
exports.updateNotice = async (notice_data) =>{
    try {
        const [result] = await noticeModel.updateNotice(notice_data);
        return [result];
    } catch (error) {
        console.log("Error at noticeService updating",error);
        throw error;
    }
}