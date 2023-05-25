const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const {
  createNewInmate,
    
} = require('../controller/inmate');

 router.route('/create/:id').post(createNewInmate);
// router.route('/update/:id/').post(updateInmate);
// router.route('/delete/:id').delete(deleteInmate);
// router.route('/detail/:id').get(getInmateDetail);


module.exports = router;

