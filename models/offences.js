const mongoose = require('mongoose');
//create Schema
const OffencesSchema = mongoose.Schema(
  {
    facility_name: {
        type: String,
        required: false,
      },
  
    offence: {
      type: mongoose.Types.ObjectId,
      ref: 'Employee',
    },
   
        
  },
  { timestamps: true }
);

// Create model from the schema
const Payroll = mongoose.model('Payroll', PayrollSchema);

// Export model
module.exports = Payroll;
