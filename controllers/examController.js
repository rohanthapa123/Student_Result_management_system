const examService = require("../services/examServices");

exports.createExam = async (req, res) => {
  try {
    const { exam_name, class_id, subject_id, exam_date } = req.body;
    console.log(req.body);
    const result = await examService.createExam(
      exam_name,
      class_id,
      subject_id,
      exam_date
    );
    // console.log(result);
    res
      .status(200)
      .json({ messaga: "exam created", insertId: result.insertId });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getExams = async (req, res) => {
  try {
    const [result] = await examService.getExams();
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getExamByClassId = async (req, res) => {
  try {
    const class_id = req.params.id;
    const [result] = await examService.getExamByClassId(class_id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteExamById = async (req, res) => {
  try {
    const exam_id = req.params.id;
    const [result] = await examService.deleteExamById(exam_id);
    // console.log(result);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
