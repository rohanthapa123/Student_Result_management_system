const multer = require("multer");

const fileSizeLimit = 2 * 1024 * 1024; // 2 MB

const imageFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/jpg",
  ];
  if (!allowedImageTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid File type. Only Images of jpg/jpeg, png, gif, webp"));
  }
  cb(null, true);
};

const storage = multer.memoryStorage(); // Store files in memory

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
