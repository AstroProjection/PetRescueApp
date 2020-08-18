const path = require('path');
const multer = require('multer');
/// multer [ for images] enctype="multipart/form-data"

const fileFilter = (req, file, callback) => {
  /// rejects file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`
    );
  },
});

const limits = {
  fileSize: 1024 * 1024 * 15,
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
