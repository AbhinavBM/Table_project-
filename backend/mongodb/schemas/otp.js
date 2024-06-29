const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;



const _OtpVerify = new Schema({
    user_id: {type :String, unique : false, required : true},  
    otp: { type: String, default: function() { return Math.floor(Math.random() * 10000).toString().padStart(4, '0'); }, unique: true },
    // Corrected the time field definition
    tableNo: {type :String, unique : false, required : true},
    status: {
      type: String,
      default: '0', // Set the default value to '0' for active
      enum: ['0', '1',], // Optional: You can define the possible values for the status field (inactive, active, suspended)
      required: true
    },   
    });

  var OtpVerifySchema = _OtpVerify;
  // compile schema to model
  var OtpVerify = mongoose.model('OtpVerify', OtpVerifySchema, 'otpVerify');
  module.exports = OtpVerify;