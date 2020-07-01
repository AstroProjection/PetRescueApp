const express = require('express');
const router = express.Router();

/// models
const Animals = require('../model/Animals');
//   @route GET api/locality/:locality
//   @desc get all the animals of the locality
//   @access public

router.get('/:locality', async (req, res) => {
  let localityInfo = {
    locality: req.params.locality.toLowerCase,
    dogs: [],
    cats: [],
  };

  // console.log(req.params.locality);
  try {
    await Animals.find(
      {
        locality: req.params.locality.toLowerCase(),
      },
      (err, animals) => {
        for (animal of animals) {
          // console.log(animal);
          switch (animal.type) {
            case 'dog':
              localityInfo.dogs.push(animal);
              break;
            case 'cat':
              localityInfo.cats.push(animal);
          }
        }
      }
    );

    // console.log(localityInfo);
    return res.status(200).json(localityInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
});

module.exports = router;
