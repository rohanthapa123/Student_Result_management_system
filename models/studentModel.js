const { pool } = require("../config/database");

class StudentModel {
  async insertStudentData(
    user_id,
    class_id,
    section_id,
    roll_no,
    blood_group,
    nationality,
    admission_id
  ) {
    try {
      const [result] = await pool.query(
        "INSERT INTO student (user_id,class_id,section_id,roll_no,admission_id,blood_group,nationality) VALUES (?,?,?,?,?,?,?)",
        [
          user_id,
          class_id,
          section_id,
          roll_no,
          admission_id,
          blood_group,
          nationality,
        ]
      );
      return result;
    } catch (error) {
      console.log("Error at student Model", error);
      throw error;
    }
  }
  async updateStudentData(
    student_id,
    class_id,
    section_id,
    roll_no,
    blood_group,
    nationality
  ) {
    try {
      const [result] = await pool.query(
        "UPDATE student SET class_id = ? ,section_id = ? , roll_no = ?,blood_group = ? ,nationality = ? WHERE student_id = ?",
        [class_id, section_id, roll_no, blood_group, nationality, student_id]
      );
      return result;
    } catch (error) {
      console.log("Error at student Model", error);
      throw error;
    }
  }
  async getAllStudents(id, sid) {
    try {
      if (id) {
        const [result] = await pool.query(
          "select fname, mname, lname,role,email,image, dob, student.user_id,student_id,student.class_id,student.roll_no, student.section_id,admission_id, blood_group, nationality,class_name, section_name from student inner join user on student.user_id = user.user_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id where student.class_id = ?",
          [id]
        );
        return [result];
      } else if (sid) {
        const [result] = await pool.query(
          "select fname, mname, lname,role,email,image, dob, student.user_id,student_id,student.class_id,student.roll_no, student.section_id,admission_id, blood_group, nationality,class_name, section_name from student inner join user on student.user_id = user.user_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id where user.fname LIKE ?",
          [sid + "%"]
        );
        return [result];
      } else {
        const [result] = await pool.query(
          "select fname, mname, lname,role,email,image, dob, student.user_id,student_id,student.class_id,student.roll_no, student.section_id,admission_id, blood_group, nationality,class_name, section_name from student inner join user on student.user_id = user.user_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id"
        );
        return [result];
      }
    } catch (error) {
      console.log("Error ar student model", error);
      throw error;
    }
  }
  async getStudentById(id) {
    try {
      const [result] = await pool.query(
        "select fname, mname, lname,role,roll_no , email,image, dob,gender, permanent_address, temporary_address, primary_contact, secondary_contact, student.user_id,student_id,student.class_id, student.section_id,admission_id, roll_no, blood_group, nationality,class_name, section_name from student inner join user on student.user_id = user.user_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id where student.student_id = ?",
        [id]
      );
      return [result];
    } catch (error) {
      console.log("Error ar student model", error);
      throw error;
    }
  }
  async getNextRollNo(class_id) {
    try {
      const [maxrollno] = await pool.query(
        " select sum(section_capacity) as max from section where class_id = ?",
        [class_id]
      );
      const maxRollNo = maxrollno[0].max;

      const [existingrollno] = await pool.query(
        "  select roll_no from student where class_id = ?",
        [class_id]
      );
      // console.log(existingrollno);
      const allrollno = existingrollno
        .map((row) => row.roll_no)
        .filter((item) => item != null);

      let nextRollNumber = null;
      for (let i = 1; i <= maxRollNo; i++) {
        if (!allrollno.includes(i)) {
          nextRollNumber = i;
          break;
        }
      }

      // Handle if all roll numbers are used
      if (nextRollNumber === null) {
        const error = new Error("Class is full");
        error.status = 400;
        throw error;
      }
      console.log(nextRollNumber);
      return nextRollNumber;
    } catch (error) {
      console.log("Error at studentModel", error);
      throw error;
    }
  }
}

module.exports = new StudentModel();
