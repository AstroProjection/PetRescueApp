const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
//middleware
const auth = require('../auth/auth');
const adminAuth = require('../auth/adminAuth');

// models
const Streets = require('../model/Streets');
const Locality = require('../model/Locality');

//   @route GET api/street/:locality/:streetname
//   @desc Get the street information by streetId
//   @access public

router.get('/:localityId', async (req, res) => {
  try {
    const streets = await Streets.find({ locality: req.params.localityId });
    return res.status(200).json(streets);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//   @route GET api/street/:locality/:streetname
//   @desc Get the street information by streetId
//   @access public

router.get('/:localityname/:streetname', async (req, res) => {
  try {
    const street = await Streets.findOne({
      streetname: req.params.streetname,
      // localityName: req.params.localityname,
    })
      .populate({ path: 'locality', select: 'locality_unique locality _id' })
      .populate({ path: 'cats dogs' });

    if (street.locality.locality_unique !== req.params.localityname)
      return res.status(400).json({ msg: 'Street Error!' });
    // console.log(street);
    res.status(200).json(street);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//   @route POST api/street/:locality
//   @desc Update the Streets Collection with street-names
//   @access private

router.post('/:locality', auth, async (req, res) => {
  // const features = req.body.features;
  let streets = [];
  try {
    // console.log(req.body.features);
    streets = req.body.features.map(async (feature) => {
      return await Streets.findOneAndUpdate(
        {
          // locality: req.params.locality,
          streetname: feature.properties.name,
        },
        {
          locality: mongoose.Types.ObjectId(req.params.locality),
        },
        async (err, street) => {
          console.log(street);
          try {
            // return;
            if (!street) {
              /// if street doesn't exit, create street
              const newStreet = Streets({
                locality: req.params.locality,
                streetname: feature.properties.name,
              });
              await newStreet.save();
            }
          } catch (error) {
            res.status(500).json({ error });
          }
        }
      );
    });

    const streetsList = await Promise.all(streets);
    res.json(streetsList.map((street) => street[0]));
  } catch (error) {
    res.status(500).json({ error });
  }
});

//   @route POST api/street/:locality/:streetname
//   @desc Add the cat/dog to the collection
//   @access private

router.post('/:locality/:streetname', auth, async (req, res) => {
  try {
    console.log('before adding animal to collection');
    // console.log(typeof req.params.locality);
    // console.log(typeof req.params.streetname);
    const street = await Streets.findOne({
      locality: req.params.locality,
      streetname: req.params.streetname,
    });

    console.log(street);
    // return;
    if (!street) return;

    switch (req.body.type.toLowerCase()) {
      case 'cat':
        street.cats.push(req.body);
        break;
      case 'dog':
        street.dogs.push(req.body);
        break;
      default:
        street.animals.push(req.body);
        break;
    }

    await street.save();

    res.status(200).json(street);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

/////////////////////////////////////////////////////////////////////////////////////// DEV API functions
//   @route DEL api/street/:locality
//   @desc remove all dogs & cats from the locality
//   @access private

router.delete('/:locality', adminAuth, async (req, res) => {
  try {
    const streets = await Streets.updateMany(
      { locality: req.params.locality },
      { cats: [], dogs: [] }
    );

    res
      .status(200)
      .json({ message: 'Removed all cats and dogs from all streets' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
