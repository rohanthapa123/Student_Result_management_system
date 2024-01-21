const noticeModel = require("../models/noticeModel")


exports.getOpenNotice = async () =>{
    try {
        const [result] = await noticeModel.getOpenNotice();
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}

exports.createNotice = async (notice_data) =>{
    try {
        // console.log(first)
        const date = Date.now();
        const date_posted = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        // console.log(formattedDate)
        const notice_data_with_date = {...notice_data,date_posted};
        const [result] = await noticeModel.addNotice(notice_data_with_date);
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}