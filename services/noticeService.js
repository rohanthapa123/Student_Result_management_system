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
        // console.log(first)
        const dateNow = Date.now();
        console.log("date",dateNow)
        const {combinedDateTime:date_posted} = dateTimeUtil.getCurrentDateTimeInKathmandu();

        console.log("date_posted",date_posted)
        // const localDate = new Date(date).toLocaleString('en-US',{timeZone: 'Asia/Kathmandu'}).slice(0, 19).replace('T', ' ');
        // console.log(formattedDate)
        // const date_posted = localDate.replace(/,/g,'').replace(/\//g,'-');
        const notice_data_with_date = {...notice_data,date_posted};
        const [result] = await noticeModel.addNotice(notice_data_with_date);
        return [result];
    } catch (error) {
        console.log("Error at noticeService",error);
        throw error;
    }
}