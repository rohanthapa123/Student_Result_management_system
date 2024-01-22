const noticeService = require("../services/noticeService");
exports.getOpenNotice = async (req, res) => {
  try {
    const [result] = await noticeService.getOpenNotice();
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error at notice Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const notice_data = req.body;
    // console.log(notice_data)
    const [result] = await noticeService.createNotice(notice_data);
    // console.log(result);
    res.status(200).json({
      message: "Notice added successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log("Error at notice controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
