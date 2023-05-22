const mongoose = require('mongoose');
const InmateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    offence_cartegory : {
      type: String,
      required: false,
    },
     endDate: {
      type: Date,
      required: false,
    },
    isActive: {
      type: String,
      required: true,
    },
     },
  { timestamps: true }
);

const Employee = mongoose.model('inmates', InmateSchema,'inmates');

module.exports = Employee;
