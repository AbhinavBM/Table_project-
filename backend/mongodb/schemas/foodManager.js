const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;


const _FoodManager= new Schema({
        name: { type: String, required: false },
        phoneNo: { type: String, required: false },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: false },
        manager_id: {type: String, default: ()=> uuidv4()},
  });

  var FoodManagerSchema = _FoodManager;
  // compile schema to model
  var foodManager = mongoose.model('FoodManager', FoodManagerSchema, 'Foodmanager');
  module.exports = foodManager;