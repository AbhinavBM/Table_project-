
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;


const _RejectedItems = new Schema({
    user_id: { type: String, required: false }, 
    rejectedItems_id: {type: String, default: ()=> uuidv4()},
    Orders_id: { type: String, required: false }, 
    reason: { type: String, required: false }, 
    drinks: [
      {
        drinkName: { type: String, unique: false, required: false },
        quantity: { type: String, unique: false, required: false },
        drink_id: { type: String, unique: false, required: false },
      },
    ],
  
    dishes: [
      {
        foodName: { type: String, unique: false, required: false },
        food_id: { type: String, unique: false, required: false },
        quantity: { type: String, unique: false, required: false },
      },
    ],
  });
  //type-0 dish 1-drink

  var RejectedItemSchema = _RejectedItems;
  // compile schema to model
  var RejectedItems = mongoose.model('Rejected', RejectedItemSchema, 'rejected');

  module.exports = RejectedItems;
