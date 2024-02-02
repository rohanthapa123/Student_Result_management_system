const multer = require("multer");
const path = require("path");

const imageFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/jpg",
  ];
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File type. Only Images of jpg/jpeg,png,gif,webp"));
  }
};
const fileSizeLimit = 2 * 1024 * 1024; // 2 MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const originalName = file.originalname.split(".");
    const filename = `${originalName[0]}_${Date.now()}.${originalName[1]}`
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    imageFilter(req, file, (err, imageFilterPassed) => {
      if (err) {
        cb(err);
      } else if (imageFilterPassed) {
        cb(null, true);
      } else {
        cb(new Error("File type validation failed"));
      }
    });
  },
  limits: {
    fileSize: fileSizeLimit,
  },
});

module.exports = upload;
