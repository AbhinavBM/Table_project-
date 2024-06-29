const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _member = new Schema({
    Address: {type :String, required : true,unique : false},
    membership_id: {type :String, required : true,unique : true},
    name: {type :String, required : true,unique : false},
    phoneNo: {type :String, required : true,unique : false},
    status: {type :String, required : true,unique : false},
 });

  var membersSchema = _member;
  // compile schema to model
  var Members = mongoose.model('Member', membersSchema, 'member');
  module.exports = Members;

  



