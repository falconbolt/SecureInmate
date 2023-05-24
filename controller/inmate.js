const path = require('path');
const mongoose = require('mongoose');
const jdb = require('../models/index.js');
const Inmate = require('../models/inmate.js');
const toId = mongoose.Types.ObjectId;

// @desc Create new inmate with logged in id
//@routes /api/v1/employee/create/:id
//@acess Private
exports.createNewInmate = asyncHandler(async (req, res, next) => {
    const{offence_category,inmate_name,id}=req.body
    
    // var _id = req.params.id; // id of the registered user 
    // var offence_category = req.body.offence_category ;
    // var inmate_name = req.params.projectname;
    // var offence_id = toId(req.body.offence_category);

    console.log('request from front =>', req.body);
    User.findOne({ _id: _id }, function (err, pool) {
      console.log('database pool=>', pool);
      if (err) {
        console.log('err', err);
        res.status(500).send(err);
      }  else {

        // Assign unique inmate number

            const d = new Date();
            let year = d.getFullYear();
            const {facility_name } = pool;
    
            const InmateCoded = `${facility_name.slice(0, 3)}-${year}-${GenerateCode(6)}`;
  
            const inmate = new Inmate({
              inmate_name: inmate_name,
              offence_category:offence_category
            });
  
            console.log(`pool before save ${inmate}`);
            inmate.save(function (err, pool) {
              if (err) {
                console.log(err);
              } else {
                console.log('add pool success');
                res.send(pool);
              }
            });
          }
        });
     
  });