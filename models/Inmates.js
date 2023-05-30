const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const InmateSchema = new mongoose.Schema(
  {
    inmate_name: {
      type: String,
      required: true,
    },
    facility_name: {
      type: String,
      required: false,
    },
    offence_category: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    
     reg_officer: {
      type: String,
      required: false,
    },
    inmate_number: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Inmate = mongoose.model('inmates', InmateSchema, 'inmates');

module.exports = Inmate;
