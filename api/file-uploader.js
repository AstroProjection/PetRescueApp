const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const upload = require('../services/file-uploader');

const singleUpload = upload.array('image', 1);

router.post('/image-upload', (req, res) => {
  console.log('before singleupload');
  req.setTimeout(0);
  singleUpload(req, res, (err) => {
    // console.log(err);
    if (err) {
      return res.status(422).send({
        errors: [{ title: 'File Upload Error', detail: err.message }],
      });
    }
    console.log(req.file);
    return res.status(200).json({ imageUrl: req.file.location });
  });
});

module.exports = router;
