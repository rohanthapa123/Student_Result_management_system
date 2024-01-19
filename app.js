const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionMiddleware = require("./config/session.js")
// import { getUser, getUsers, createUser } from "./database.js";

// app.get("/api/users", async (req, res) => {
//   const users = await getUsers();
//   res.send(users);
// });

// app.post("/api/users/:email", async (req, res) => {
//   const user = await getUser(req.params.email);
//   res.send({
//     success: 1,
//     res: user,
//   });
// });

// app.post("/api/user", async (req, res) => {
//   const { fname, mname, lname, role, email, dob, password } = req.body;
//   const user = await createUser(
//     fname,
//     mname,
//     lname,
//     role,
//     email,
//     dob,
//     password
//   );
//   res.send(user);
// });
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
  
app.use(sessionMiddleware)

app.use(express.json());

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

const userRouter = require("./routes/userRoute.js");
app.use(userRouter);

const classRouter = require("./routes/classRoute.js");
app.use(classRouter);

const auth = require("./routes/auth.js");
app.use(auth);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("<h1>Something broke!</h1>");
});

app.listen(8080, () => {
  console.log("server is runnning on port 8080");
});
