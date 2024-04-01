const examService = require("../services/examServices");

exports.createExam = async (req, res) => {
  try {
    const { exam_name, class_id, subject_id, exam_date, term } = req.body;
    console.log(req.body);
    const result = await examService.createExam(
      exam_name,
      class_id,
      subject_id,
      exam_date,
      term
    );
    // console.log(result);
    res
      .status(200)
      .json({ message: "exam created", insertId: result.insertId });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateExam = async (req, res) => {
  try {
    const { exam_name, class_id, subject_id, exam_date, term, exam_id } =
      req.body;
    console.log(req.body);
    const result = await examService.updateExam(
      exam_name,
      class_id,
      subject_id,
      exam_date,
      term,
      exam_id
    );
    // console.log(result);
    res
      .status(200)
      .json({ message: "exam updated", insertId: result?.insertId });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getExams = async (req, res) => {
  try {
    const { id: class_id } = req.query;
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
    const role = req.session.role;
    if (role === "admin") {
      const [result] = await examService.getExamByClassId(class_id);
      res.status(200).json({ data: result });
    }else if( role === "teacher"){
      const [result] = await examService.getExamOfTeacherClass(req.session.user_id , class_id);
      res.status(200).json({ data: result });
    }
    // console.log(result);
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getExamById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await examService.getExamById(id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getExamOfTeacherClass = async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const [result] = await examService.getExamOfTeacherClass(user_id);
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
