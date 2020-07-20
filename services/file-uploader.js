const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('config');

/// config aws
aws.config.update({
  secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
  accessKeyId: config.get('AWS_ACCESS_ID'),
  region: config.get('AWS_REGION'),
  signatureVersion: 'v4',
});

/// filter files
const fileFilter = (req, file, callback) => {
  /// cb(null,false) rejects file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log('image type accepted');

    callback(null, true);
  } else {
    console.log('image type not accepted');
    callback(new Error('Invalid mime type, only JPEG and PNG'), false);
  }
};
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('S3_BUCKET_NAME'),
    // acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 15 },
});

module.exports = upload;
