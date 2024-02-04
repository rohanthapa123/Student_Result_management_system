const subjectService = require("../services/subjectService");

exports.createSubject = async (req, res) => {
  try {
    const { subject_name, subject_code, class_id } = req.body;
    console.log(req.body)
    const result = await subjectService.createSubject(subject_name, subject_code, class_id);
    // console.log(result);
    res.status(200).json({ messaga: "Subject created", insertId: result.insertId });
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubjects = async (req, res) => {
  try {
    const [result] = await subjectService.getSubjects();
    // console.log(result);
    res.status(200).json({ data: result});
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubjectByClassId = async (req, res) => {
  try {
    const class_id = req.params.id;
    const [result] = await subjectService.getSubjectByClassId(class_id);
    // console.log(result);
    res.status(200).json({ data: result});
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteSubjectById = async (req, res) => {
  try {
    const subject_id = req.params.id;
    const [result] = await subjectService.deleteSubjectById(subject_id);
    // console.log(result);
    res.status(200).json({ message: "Successfully deleted"});
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
