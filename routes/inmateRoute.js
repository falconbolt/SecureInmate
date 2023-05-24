const express = require('express');
const router = express.Router()
// const multer = require('multer');
// const upload = multer();


const {
    createNewInmate,
//   updateInmate,
//   inmateDetails,
//   DeleteInmate,
//   allInmate
 
} = require('../controller/inmates');


router.post('/register', createNewInmate);
// router.post('/update', updateInmate);


module.exports = router;
