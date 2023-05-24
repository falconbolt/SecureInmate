const path = require('path');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User');
const Inmate = require('../models/Inmates');
const toId = mongoose.Types.ObjectId;

// @desc Create new inmate with logged in id
//@routes /api/v1/inmate/create/:id
//@acess Private
exports.createNewInmate = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const { inmate_name, offence_cartegory,id } = req.body;


  try {
    console.log('request from front =>', req.body);
    const pool = await User.findOne({ id });

    console.log('pool content=>', pool);
    
    if (!pool) {
      return res.status(404).json({ error: 'Pool not found' });
    }

    // Generate unique number for new inmate
    const d = new Date();
    const year = d.getFullYear();
    const { facility_name } = pool;
    const InmateCoded = `${facility_name.slice(0, 3)}-${year}-${GenerateCode(6)}`;

    const inmate = new Inmate({
      inmate_name,
      facility_name: pool.facility_name,
      email: pool.email,
      inmate_number: InmateCoded,
    });

    console.log(`pool before save ${inmate}`);
    await inmate.save();

    console.log('added inmate successfully!');
    res.send(inmate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

