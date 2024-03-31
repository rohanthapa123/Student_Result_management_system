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
exports.editSubject = async (req, res) => {
  try {
    const { subject_name, subject_code, class_id , subject_id } = req.body;
    console.log(req.body)
    const result = await subjectService.editSubject(subject_name, subject_code, class_id, subject_id);
    // console.log(result);
    res.status(200).json({ messaga: "Subject Edited", insertId: result.insertId });
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubjects = async (req, res) => {
  try {
    const {class_id : id} = req.query;
    const [result] = await subjectService.getSubjects(id);
    // console.log(result);
    res.status(200).json({ data: result});
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubjectByClassId = async (req, res) => {
  try {
    const class_id = req.params.cid;
    const [result] = await subjectService.getSubjectByClassId(class_id);
    // console.log(result);
    res.status(200).json({ data: result});
  } catch (error) {
    console.log("error at subjectController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSubjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await subjectService.getSubjectById(id);
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
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
