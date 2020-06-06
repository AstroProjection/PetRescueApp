const express = require('express');
const router = express.Router();

const Locality = require('../model/Locality');

router.get('/:locality', async (req, res) => {
  try {
    const newLocality = new Locality({
      locality: 'name',
    });

    await newLocality.save();
    console.log(newLocality);
    // res.json(res.data);
  } catch (error) {
    console.log('error');
    console.log(error);
  }
});

module.exports = router;
