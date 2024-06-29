const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;
const Orders  = require('./Orders');
const   Staff= require('./staff');
const   fManager= require('./foodManager');
const   Dish= require('./foodManager');
const   Drinks= require('./foodManager');
const Table  = require('./table');

const _Admin = new Schema({
    // staff:[Staff],
    // orders:Orders,
    // fmanager:fManager,
    // dish:Dish,
    // drinks:Drinks,
    // table:Table,
    
  });

  var AdminSchema = _Admin;
  // compile schema to model
  var Admin = mongoose.model('Admin', AdminSchema, 'admin');
  module.exports = Admin;