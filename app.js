const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./config/session.js");
const cors = require("cors");
const moment = require("moment-timezone");
const authMiddleware = require("./middleware/auth.middleware.js");

app.set('trust proxy', 1);

app.use(cookieParser());

app.use(sessionMiddleware);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST','PUT', 'PATCH', 'DELETE'],
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


app.use(express.json());
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("index");
});



app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/api/images/:filename", authMiddleware.loggedIn, (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "images", filename));
});




const routers = require("./routes/index.js");

// Use all routers
routers.forEach((router) => {
  app.use(router);
});




const multer = require("multer");

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
