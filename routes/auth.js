const express = require('express');
const router = express.Router()
// const multer = require('multer');
// const upload = multer();


const {
  registerUser,
  loginUser,
 
} = require('../controller/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);
// router.route('/department/:email').post(upload.none(), addDepartment);







module.exports = router;
