const noticeService = require("../services/noticeService");

exports.getNoticeById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await noticeService.getNoticeById(id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error at notice Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getNotice = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const role = req.user.role;
    if (role === "admin") {
      const [result] = await noticeService.getNotice();
      // console.log(result);
      res.status(200).json({ data: result });
    } else if (role === "student") {
      const [result] = await noticeService.getNotice(user_id , role);
      // console.log(result);
      res.status(200).json({ data: result });
    }else if (role === "teacher"){
      const [result] = await noticeService.getNotice(user_id , role);
      // console.log(result);
      res.status(200).json({ data: result });
    }
  } catch (error) {
    console.log("Error at notice Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const id = req.params.id;
    await noticeService.deleteNotice(id);
    // console.log(result);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("Error at notice Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createNotice = async (req, res) => {
  try {
    // const role = req.user.role;
    const notice_data = req.body;
    console.log(notice_data);

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

exports.updateNotice = async (req, res) => {
  try {
    const notice_data = req.body;
    // console.log(notice_data)
    const [result] = await noticeService.updateNotice(notice_data);
    // console.log(result);
    res.status(200).json({
      message: "Notice updated successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log("Error at notice controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
