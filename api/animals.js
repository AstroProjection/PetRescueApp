const express = require('express');
const router = express.Router();

/// auth middleware
const auth = require('../auth/auth');

// Animals model
const Animals = require('../model/Animals');

/// multer [ for images] enctype="multipart/form-data"
const multer = require('multer');

const fileFilter = (req, file, callback) => {
  /// cb(null,false) rejects file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter: fileFilter,
});

///////////////////////////////////////////

/// @route GET api/animals/
/// @desc fetching all the animal data
/// @access public

router.get('/', async (req, res) => {
  const data = await Animals.find({}).populate({
    path: 'users',
    select: '_id name',
  });

  return res.json(data);
});

/// @route  POST api/animals/
/// @desc adding an animal
/// @access private

router.post('/', [auth, upload.array('image', 1)], async (req, res) => {
  try {
    const newAnimal = new Animals({
      name: req.body.name,
      location: req.body.location,
      type: req.body.type,
      image: req.files.length > 0 ? req.files[0].path : null,
    });

    await newAnimal.save();

    res.json(newAnimal);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;