// routes/index.js
const studentRouter = require('./studentRoute');
const teacherRouter = require('./teacherRoute');
const noticeRouter = require('./noticeRoute');
const complainRouter = require('./complainRoute');
const userRouter = require('./userRoute');
const classRouter = require('./classRoute');
const examRouter = require('./examRoute');
const markRouter = require('./markRoute');
const sectionRouter = require('./sectionRoute');
const subjectRouter = require('./subjectRoute');
const auth = require("./auth.js");
const adminRouter = require('./adminRoute.js')

module.exports = [
  studentRouter,
  teacherRouter,
  noticeRouter,
  complainRouter,
  userRouter,
  classRouter,
  examRouter,
  markRouter,
  sectionRouter,
  subjectRouter,
  adminRouter,
  auth,
];
