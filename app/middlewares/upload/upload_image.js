const multer = require("multer");
const handleUpload = () => {
  //upload file
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./app/public/upload"); //set duong dan luu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        req.errorFileType = "Only .png, .jpg and .jpeg format allowed!";
      }
    },
  });
  return upload.single("image");
};
module.exports = handleUpload;
