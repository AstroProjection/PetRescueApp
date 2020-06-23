const express = require('express');
const router = express.Router();

/// auth middleware
const auth = require('../auth/auth');

// Animals model
const Animals = require('../model/Animals');
const Streets = require('../model/Streets');

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
/// @desc Adding an animal
/// @access private

router.post('/', [auth, upload.array('image', 1)], async (req, res) => {
  try {
    const vaccineArrString = req.body['vaccine-arr'];
    // as objects cannot be passed through multipart/form-data so we need to send them like this
    let vaccineArr = vaccineArrString.map((vaccineString) =>
      JSON.parse(vaccineString)
    );
    const spayedObj = {
      status: req.body['spayed-value'] || 2,
      hospital: req.body['spayed-hospital'] || null,
      user: req.body['spayed-user'] || null,
      cost: req.body['spayed-cost'] || null,
    };

    const newAnimal = new Animals({
      name: req.body.name,
      location: req.body.location,
      locality: 'victoria-layout',
      type: req.body.type,
      image: req.files.length > 0 ? req.files[0].path : null,
      user: req.user.id,
      medical: {
        spayed: spayedObj,
        vaccines: vaccineArr,
      },
    });
    await newAnimal.save();
    res.json(newAnimal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

/// @route PUT api/animals/:streetname
/// @desc fetching all the animal data
/// @access public

router.put('/', async (req, res) => {
  try {
    const streetId = req.body._id;

    const data = await Streets.findById(streetId).populate({
      path: 'dogs cats',
      select: 'name _id locality location image type',
    });

    const { dogs, cats } = data;
    return res.status(200).json({ dogs, cats });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
