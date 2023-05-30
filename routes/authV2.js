const express = require('express');
const router = express.Router()
// const multer = require('multer');
// const upload = multer();


const {
  registerUserV2,
  loginV2,
  fogotPassword,
  resetPassword,
  updateDetails

} = require('../controller/authV2');

router.post('/registerV2', registerUserV2);
router.post('/loginV2', loginV2);
router.put('/updatedetails', updateDetails);
router.post('/forgotpassword', fogotPassword);
router.put('/resetpassword/:resettoken',  resetPassword);




module.exports = router;



