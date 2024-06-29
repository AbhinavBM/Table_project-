const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _Drinks= new Schema({
    drinkName: {type :String, unique : false, required : true},
    drinkNamePrice: {type :String, unique : false, required : true},
    drink_id: {type: String, default: ()=> uuidv4()},
    drinkCategories: {type :String, unique : false, required : true},
    drinks_category_id: {type :String, unique : false, required : true},  
    description: {type :String, unique : false, required : true},  
    filenames : {type:String,required : false},
    drinkStatus: {
      type: String,
      default: '0',
      enum: ['0', '1',], 
      required: false
    },
    tax:{type:String,required:false,default:'0'}
    });

  var DrinksSchema = _Drinks;
  var Drinks = mongoose.model('Drinks', DrinksSchema, 'drinks');
  module.exports =  Drinks;
   