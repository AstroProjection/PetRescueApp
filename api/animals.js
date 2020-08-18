const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
/// auth middleware
const auth = require('../auth/auth');
// Animals model
const Animals = require('../model/Animals');
const Streets = require('../model/Streets');

const upload = require('../services/imageUploader');
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
router.post(
  '/',
  [
    auth,
    upload.array('image', 1),
    check('name', 'Please enter name!').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    try {
      //req.body is not of type Object..
      req.body = JSON.parse(JSON.stringify(req.body));

      let vaccineArr =
        req.body.hasOwnProperty('vaccineArr') && req.body.vaccineArr.length > 0
          ? req.body.vaccineArr.map((vaccineString) =>
              JSON.parse(vaccineString)
            )
          : [];
      const spayedObj = {
        status: req.body.spayedValue || 2,
        hospital: req.body.spayedHospital || null,
        user: req.body.spayedUser || null,
        cost: req.body.spayedCost || null,
      };

      //// identity - 0 - stray , 1 - pet...
      const animal = new Animals({
        name: req.body.name,
        location: req.body.location,
        locality: req.body.locality,
        type: req.body.type,
        image: req.files.length > 0 ? req.files[0].filename : null,
        user: req.user.id,
        identity: parseInt(req.body.identity),
        medical: {
          spayed: spayedObj,
          vaccines: vaccineArr,
        },
      });

      await animal.save(async (err) => {
        if (err) return res.status(500).json({ msg: 'Error adding animal!' });
        // console.log('successful addition');
        const street = await Streets.findOne({
          streetname: req.body.location,
        });
        // console.log(street);
        // console.log(animal.locality);
        // console.log(street.locality);
        if (animal.locality.toString() !== street.locality.toString())
          throw Error('Locality dont match');

        street[animal.type + 's'].unshift(animal);
        await street.save();

        res.status(200).json({ animal, type: animal.type });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
);

/// @route PUT api/animals/:streetname
/// @desc fetching all the animal data
/// @access public

router.put('/', async (req, res) => {
  try {
    const streetId = req.body._id;

    const data = await Streets.findById(streetId).populate({
      path: 'dogs cats',
    });

    const { dogs, cats } = data;
    return res.status(200).json({ dogs, cats });
  } catch (error) {
    res.json({ error });
  }
});

/// @route DELETE api/animals/:animalId
/// @desc deleting the animal
/// @access private

router.delete('/:animalId', auth, async (req, res) => {
  try {
    const animal = await Animals.findById(req.params.animalId);

    if (animal.user.toString() === req.user._id)
      return res.status(401).send({ msg: 'Not authorized to delete' });
    const type = animal.type;
    await animal.remove();

    res.status(200).json(type);
  } catch (errors) {
    console.dir(errors);
    return res.status(404).send({ errors });
  }
});

/// @route GET api/animals/:animalId
/// @desc getting the animal profile
/// @access public

router.get('/:animalId', async (req, res) => {
  try {
    const animal = await Animals.findById(req.params.animalId).populate({
      path: 'locality',
      select: 'locality',
    });
    const street = await Streets.findOne({
      locality: animal.locality._id.toString(),
      streetname: animal.location,
    }).select('displayName');
    res.status(200).json({ ...animal._doc, streetInfo: street });
  } catch (errors) {
    console.dir(errors);
    return res.status(404).send({ errors });
  }
});

module.exports = router;
