const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const _foodCategory = new Schema({
    food_Category: {type :String, required : true,unique : true},
    food_Category_id: {type: String, default: ()=> uuidv4()},
 });

  var FoodCategorySchema = _foodCategory;
  // compile schema to model
  var FoodCategory = mongoose.model('FoodCategory', FoodCategorySchema, 'foodcategory');
  module.exports = FoodCategory;