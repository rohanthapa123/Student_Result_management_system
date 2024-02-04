const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./config/session.js");
const cors = require("cors");
const moment = require("moment-timezone");
const authMiddleware = require("./middleware/auth.middleware.js");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

moment.tz.setDefault("Asia/Kolkata"); // Using 'Asia/Kolkata' as a workaround

app.use((req, res, next) => {
  // Manually adjust for the additional 15 minutes offset
  moment.fn.ktm = function () {
    return this.utcOffset(5 * 60 + 45);
  };
  next();
});

app.use(cookieParser());

app.use(sessionMiddleware);

app.use(express.json());
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/api/images/:filename", authMiddleware.loggedIn, (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "images", filename));
});

const studentRouter = require("./routes/studentRoute.js");
app.use(studentRouter);
const teacherRouter = require("./routes/teacherRoute.js");
app.use(teacherRouter);

const noticeRouter = require("./routes/noticeRoute.js");
app.use(noticeRouter);

const complainRouter = require("./routes/complainRoute.js");
app.use(complainRouter);

const userRouter = require("./routes/userRoute.js");
app.use(userRouter);

const classRouter = require("./routes/classRoute.js");
app.use(classRouter);

const sectionRouter = require("./routes/sectionRoute.js");
app.use(sectionRouter);

const subjectRouter = require("./routes/subjectRoute.js");
app.use(subjectRouter)

const auth = require("./routes/auth.js");
const multer = require("multer");
const { loggedIn } = require("./middleware/auth.middleware.js");
app.use(auth);

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: "File upload error. Please check the file type and size.",
    });
  } else if (
    err.message === "Invalid File type. Only Images of jpg/jpeg,png,gif,webp"
  ) {
    return res.status(400).json({ error: err.message });
  } else if (err.message === "File size exceeds the allowed limit (2 MB).") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).send("<h1>Something broke!</h1>");
});

app.listen(8080, () => {
  console.log("server is runnning on port 8080");
});
