const complainService = require("../services/complainService");

exports.getComplain = async (req, res) => {
  try {
    const [result] = await complainService.getComplain();
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error at complain Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getMyComplain = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const [result] = await complainService.getMyComplain(user_id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error at complain Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteComplain = async (req, res) => {
  try {
    const id = req.params.id;
    await complainService.deleteComplain(id);
    // console.log(result);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("Error at complain Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createComplain = async (req, res) => {
  try {
    const message = req.body.message;
    console.log(req.body)
    const user_id = req.user.user_id;
    // console.log(notice_data)
    const complain_data = {message, user_id}
    console.log("Comalin data",complain_data)
    const [result] = await complainService.createComplain(complain_data);
    // console.log(result);
    res.status(200).json({
      message: "Complain added successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log("Error at complain controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.solveComplain = async (req, res) => {
  try {
    const complain_id = req.params.id;
    
    const [result] = await complainService.solveComplain(complain_id);
    // console.log(result);
    res.status(200).json({
      message: "Complain solved successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log("Error at complain controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
