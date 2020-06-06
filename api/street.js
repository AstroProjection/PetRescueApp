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
    console.log('checking street collection');
    const streets = await Streets.find({ locality: req.params.locality });
    // console.log(streets);
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
    const street = await Streets.find(
      {
        name: req.params.streetname,
        locality: req.params.locality,
      },
      '*'
    );

    res.json(street);
  } catch (error) {
    return res.status(500).json({ error });
  }
  // console.log(street);
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
            } else {
              // /if there is a street, update it
              street[0].streetname = feature.properties.name;
              street[0].cats = feature.properties.cats;
              street[0].dogs = feature.properties.dogs;
              street[0].feeder = feature.properties.feeder;

              // await Streets.findByIdAndUpdate()
              await street[0].save();
              // console.log(feature);
              // await street.save();
            }
          } catch (error) {
            res.status(500).json({ error });
          }
          // console.log(streets);
          //   const streetList = await Promise.all(streets);
          //   console.log(streetList);
        }
      );
      // console.log(streets);
    });
    // console.log(streets);
    const streetsList = await Promise.all(streets);
    res.json(streetsList.map((street) => street[0]));
  } catch (error) {
    res.status(500).json({ error });
    // console.error(error);
  }
});

module.exports = router;
