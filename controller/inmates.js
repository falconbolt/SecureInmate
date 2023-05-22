const path = require('path');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse.js');
const listDatesForThePastDays = require('../utils/pastDaysPicker.js');
const GenerateCode = require('../utils/generateCode.js');
const Inmate = require('../models/Inmates');
const toId = mongoose.Types.ObjectId;

// @desc Create new inmate with logged in id
//@routes /api/v1/inmate/create/:id
//@acess Private
exports.createNewInmate = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  var _id = req.params.id;
  var name = req.body.name;
  var facility_name = req.params.facility_name;
  var offenceCat_id = toId(req.body.offenceCat);
  console.log('request from front =>', req.body);
  User.findOne({ _id: _id }, function (err, pool) {
    console.log('pool content=>', pool);
    if (err) {
      console.log('err', err);
      res.status(500).send(err);
    } else {
      //Generate unique number for new inmate
      const d = new Date();
      let year = d.getFullYear();
      const { name } = pool;
      const ItemCoded = `${facility_name.slice(0, 3)}-${year}-${GenerateCode(6)}`;

      const inmate = new Inmate({
        name: pool.name,
        facility_name: facility_name,
        email: pool.email,
      });

      console.log(`pool before save ${inmate}`);
      inmate.save(function (err, pool) {
        if (err) {
          console.log(err);
        } else {
          console.log('add inmate success');
          res.send(pool);
        }
      });
    }
  });
});
