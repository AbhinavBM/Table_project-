const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _drinksCategory = new Schema({
    drinksCategory: {type :String, required : true,unique : true},
    drinks_Category_id: {type: String, default: ()=> uuidv4()},
 });

  var DrinksCategorySchema = _drinksCategory;
  // compile schema to model
  var DrinksCategory = mongoose.model('DrinksCategory', DrinksCategorySchema, 'drinksCategory');
  module.exports = DrinksCategory;