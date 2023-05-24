const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const InmateSchema = new mongoose.Schema(
  {
    Inmate_name: {
      type: String,
      required: true,
    },
    offence_cartegory : {
      type: String,
      required: false,
    },
 
     },
  { timestamps: true }
);

const Inmate = mongoose.model('inmates', InmateSchema,'inmates');

module.exports = Inmate;
