const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _Food= new Schema({
    foodName: {type :String, unique : false, required : true},
    foodPrice: {type :String, unique : false, required : true},
    food_id: {type: String, default: ()=> uuidv4()},
    foodCategories: {type :String, unique : false, required : true},
    filenames : {type:String,required : false},
    type: {type :String, unique : false, required : true},
    //0 -veg
    //1-non veg
    //2 -egg
    food_category_id: {type :String, unique : false, required : true},  
    description: {type :String, unique : false, required : true},  
    foodStatus: {
      type: String,
      default: '0',
      enum: ['0', '1',], 
      required: false
    },
    tax:{type:String,required:false,default:'0'}
    });

  var FoodSchema = _Food;
  // compile schema to model
  var Food = mongoose.model('Food', FoodSchema, 'food');
  module.exports = Food;