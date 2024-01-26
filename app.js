const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./config/session.js");
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(sessionMiddleware);

app.use(express.json());
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

const studentRouter = require("./routes/studentRoute.js");
app.use(studentRouter);

const noticeRouter = require("./routes/noticeRoute.js");
app.use(noticeRouter);

const userRouter = require("./routes/userRoute.js");
app.use(userRouter);

const classRouter = require("./routes/classRoute.js");
app.use(classRouter);

const sectionRouter = require("./routes/sectionRoute.js");
app.use(sectionRouter);

const auth = require("./routes/auth.js");
app.use(auth);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("<h1>Something broke!</h1>");
});

app.listen(8080, () => {
  console.log("server is runnning on port 8080");
});
