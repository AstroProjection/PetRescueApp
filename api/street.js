const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');

// models
const Streets = require('../model/Streets');
const Locality = require('../model/Locality');

//   @route GET api/streets
//   @desc Get the street information of the locality
//   @access private

router.get('/:locality', async (req, res) => {
  try {
    const streets = await Streets.find({ locality: req.params.locality });
    res.json(streets);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//   @route GET api/street/:locality/:streetname
//   @desc Get the street information of the locality
//   @access public

router.get('/:locality/:streetname', async (req, res) => {
  try {
    // console.log(req.params.locality, req.params.streetname);
    const street = await Streets.findOne({
      streetname: req.params.streetname,
      locality: req.params.locality,
    });

    res.json(street);
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
    streets = req.body.features.map(async (feature, index) => {
      return await Streets.find(
        {
          locality: req.params.locality,
          streetname: feature.properties.name,
        },
        async (err, street) => {
          try {
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

router.post('/:locality/:streetname', async (req, res) => {
  try {
    const street = await Streets.findOne({
      locality: req.params.locality,
      streetname: req.params.streetname,
    });

    // console.group(req.body);

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

    // console.log(street);

    await street.save();

    res.status(200).json({ message: 'Successfully added to street' });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

//   @route DEL api/street/:locality
//   @desc remove all dogs & cats from the locality
//   @access private

router.delete('/:locality', auth, async (req, res) => {
  try {
    const streets = await Streets.find({}, async (err, street) => {
      street.dogs = [];
      street.cats = [];

      await street.save();
    });

    res
      .status(200)
      .json({ message: 'Removed all cats and dogs from all streets' });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
