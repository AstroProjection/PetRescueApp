const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');
const adminAuth = require('../auth/adminAuth');
/// models
const Animals = require('../model/Animals');
const Locality = require('../model/Locality');
//   @route GET api/locality/:locality
//   @desc Fetching the locality JSON from DB using locality-unique-name
//   @access public

router.get('/:locality', async (req, res) => {
  try {
    const locality = await Locality.findOne({
      locality_unique: req.params.locality.toLowerCase(),
    });
    // console.log(localityInfo);
    return res.status(200).json(locality);
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
});

//   @route POST api/locality/
//   @desc Adding locality to DB
//   @access Private[ADMIN]

router.post('/', adminAuth, async (req, res) => {
  try {
    const locality = await Locality.findOne({
      locality_unique: req.body.locality_unique,
    });

    if (locality)
      return res.status(400).json({ msg: 'Locality already exists' });

    const newLocality = new Locality({ ...req.body });

    await newLocality.save();

    res.status(200).json({ msg: 'Added Locality', newLocality });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Failed to add Locality',
    });
  }
});

//   @route PUT api/locality/:localityId
//   @desc Updating locality in DB
//   @access Private[ADMIN]

router.put('/:localityId', adminAuth, async (req, res) => {
  try {
    const locality = await Locality.findOneAndUpdate(
      {
        _id: req.params.localityId,
      },
      {
        ...req.body,
      },
      (err, doc) => {
        // console.log(doc);
        if (err)
          return res.status(400).json({ msg: 'Locality does not exist' });
      }
    );

    res.status(200).json({ msg: 'Updated Locality', locality });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      msg: 'Failed to add Locality',
    });
  }
});

module.exports = router;
