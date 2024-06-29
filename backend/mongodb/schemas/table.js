const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;




const _Table = new Schema({
    tableNo: {type :String, unique : true, required : true},
    active: {type :String, unique : false, required : false},//true or false
    maxPeople: {type :String, unique : false, required : true},//true or false
     });

  var TableSchema = _Table;
  // compile schema to model
  var Table = mongoose.model('Table', TableSchema, 'table');
  module.exports = Table;