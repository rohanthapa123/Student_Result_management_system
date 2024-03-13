const marksService = require("../services/marksService");

exports.insertMark = async (req, res) => {
  try {
    // const { subject_id, exam_id, student_id, marks_obtained, remarks, grade } =
    //   req.body;
    const marks = req.body;
    // console.log(req.body);
    const result = await marksService.insertMark(
      marks
    );
    console.log(result);
    res
      .status(200)
      .json({ messaga: "marks inserted" });
  } catch (error) {
    console.log("error at markController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getResult = async (req, res) => {
  const  exam_term  = req.params.term;
  console.log(req.params)
  console.log(exam_term)
  const user_id = req.session.user_id;
  // console.log(req.body)
  try {
    const result = await marksService.getResult(
      user_id,
      exam_term
    );
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at markController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getMarksByClass = async (req, res) => {
  const exam_id = req.query.exam_id;
  const class_id = req.query.class_id;
  // console.log(req.params.id)
  console.log(req.query.exam_id);
  console.log(req.query.class_id);
  try {
    const [result] = await marksService.getMarksByClass(class_id, exam_id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at markController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteMarksById = async (req, res) => {
  try {
    const marks_id = req.params.id;
    const [result] = await marksService.deleteMarksById(marks_id);
    // console.log(result);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log("error at markController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
