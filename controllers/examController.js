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
    const { class_id } = req.query;
    console.log(class_id)
    const role = req.user.role;
    if (class_id) {
      if (role === "admin") {
        const [result] = await examService.getExams(class_id);
        // console.log(result);
        res.status(200).json({ data: result });
      } else if (role === "teacher") {
        const [result] = await examService.getExamOfTeacherClass(
          req.user.user_id,
          class_id
        );
        res.status(200).json({ data: result });
      }
    } else {
      const [result] = await examService.getExams();
      // console.log(result);
      res.status(200).json({ data: result });
    }
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
    const user_id = req.user.user_id;
    const [result] = await examService.getExamOfTeacherClass(user_id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at examController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getTerms = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const [result] = await examService.getTerms(user_id);
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
