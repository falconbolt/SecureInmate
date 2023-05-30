const path = require('path');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User.js');
const Inmate = require('../models/Inmates.js');
const GenerateCode = require('../utils/generateCode.js');
const toId = mongoose.Types.ObjectId;

// @desc Create new inmate with logged in id
//@routes /api/v1/inmate/create/:id
//@acess Private
exports.createNewInmate = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  const _id = req.params.id;
  const { inmate_name, offence_category,gender } = req.body;

  try {
    console.log('request from front =>', req.body);
    const pool = await User.findOne({ _id });

    console.log('pool content=>', pool);

    if (!pool) {
      return res.status(404).json({ error: 'Pool not found' });
    }

    // Generate unique number for new inmate
    const d = new Date();
    const year = d.getFullYear();
    const { facility_name, email } = pool;
    const InmateCoded = `${facility_name.slice(0, 3)}-${year}-${GenerateCode(
      6
    )}`;

    const inmate = new Inmate({
      inmate_name: inmate_name,
      facility_name: facility_name,
      reg_officer: email,
      inmate_number: InmateCoded,
      offence_category: offence_category,
    });

    console.log(`pool before save ${inmate}`);
    await inmate.save();

    console.log('added inmate successfully!');
    res.send(inmate);
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: 'Internal server error' });
    next(new ErrorResponse('cannot create inmate'));
  }
});

//@desc Get all inmate by user email
//@routes Get/api/v1/inmate/all
//@acess Public
exports.getAllInmate = asyncHandler(async (req, res, next) => {
  try {
    const facility_name = req.body.facility_name;
    const inmates = await Inmate.find({ facility_name });
    res.json(inmates);
  } catch (err) {
    console.log(err);
    next(new ErrorResponse('cannot retrieve all inmate', 404));
  }
});

//@desc Get one Inmate
//@routes Get/api/inmate/:num
//@acess  Private
exports.getOneInmate = asyncHandler(async (req, res, next) => {
  try {
    const num = req.params.num;
    const InmateDetail = await Inmate.findOne({ inmate_number: num });

    if (!InmateDetail) {
      const error = new ErrorResponse('Inmate not found', 404);
      throw error;
    }

    res.json(InmateDetail);
  } catch (error) {
    next(error);
  }
});
//@desc Update one Inmate
//@routes Get/api/v1/update/inmate/:num
//@acess  Private
exports.updateInmate = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params.num);
    const inmateNum = await Inmate.findOne({ inmate_number: req.params.num });

    if (!inmateNum) {
      return next(
        new ErrorResponse(
          `No inmate with the inmate number of ${req.params.num}`
        ),
        404
      );
    }

    const inmateDetail = await Inmate.findOneAndUpdate(
      { inmate_number: req.params.num },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: inmateDetail,
    });
  } catch (error) {
    next(new ErrorResponse('Internal server error', 500));
  }
});

// @desc Delete inmates
// @route DELETE /api/v1/inmate/delete/:id
// @access Private
exports.deleteInmate = asyncHandler(async (req, res, next) => {
  try {
    console.log('delete id =>', req.params.num);
    const inmate = await Inmate.findOne({ inmate_number: req.params.num });

    if (!inmate) {
      return next(
        new ErrorResponse(
          `No inmate with the inmate number of ${req.params.num}`
        ),
        404
      );
    }

    await Inmate.findOneAndDelete({ inmate_number: req.params.num });

    res.status(200).json({
      success: true,
      message: 'Inmate deleted successfully',
    });
  } catch (error) {
    next(new ErrorResponse('Internal server error', 500));
  }
});
