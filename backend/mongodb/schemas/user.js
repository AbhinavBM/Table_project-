const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _User = new Schema({
  member_name: { type: String, required: false, unique: false },
  member_phoneNo: { type: String, required: false, unique: false },
  membership_id: { type: String, required: false, unique: false },
  name: { type: String, unique: false, required: false },
  phoneNo: { type: String, unique: false, required: false },
  user_id: { type: String, default: () => uuidv4() },
  tableNo: { type: String, unique: false, required: false },
  donationAmount: {type :String, required : false, unique:false,default:"0"},

  userStatus: {
    type: String,
    default: '0',
    enum: ['0', '1', '2'],
    required: true
  }
  
});



  var UserSchema = _User;
  // compile schema to model
  var User = mongoose.model('User', UserSchema, 'user');
  module.exports = User;