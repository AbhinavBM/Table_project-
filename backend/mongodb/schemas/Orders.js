const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;

const _Orders = new Schema({
  tableNo: { type: String, unique: false, required: true },
  food_active: { type: String, unique: false, required: true, default: "0" }, //0-active or 1-inactive
  drink_active: { type: String, unique: false, required: true, default: "0" }, //true or false
  order_active: { type: String, unique: false, required: true, default: "0" }, //true or false, //true or false
  user_id: { type: String, unique: false, required: true },
  member_name: { type: String, required: false, unique: false },
  orderStatus: {
    type: String, 
    default: "0", 
    enum: ["0", "1","1.5", "2","999"], 
    required: true,
  },
 
  foodOrderStatus: {
    type: String, 
    default: "0", 
    enum: ["0", "1","1.5", "2","999"], 
    required: true,
  },
  drinkOrderStatus: {
    type: String, 
    default: "0", 
    enum: ["0", "1","1.5", "2","999"], 
    required: true,
  },
  otp: {type :String, required : false, unique:false},


  Orders_id: { type: String, default: () => uuidv4() },
  date1: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const istDate = new Date(currentDate.getTime() + istOffset);
      const year = istDate.getFullYear();
      const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Zero-padded
      const day = istDate.getDate().toString().padStart(2, "0"); // Zero-padded
      return `${year}-${month}-${day}`;
    },
    unique: false,
  },

  time1: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const istTime = new Date(currentDate.getTime() + istOffset);
      const hours = istTime.getUTCHours().toString().padStart(2, "0"); // Zero-padded
      const minutes = istTime.getUTCMinutes().toString().padStart(2, "0"); // Zero-padded
      const seconds = istTime.getUTCSeconds().toString().padStart(2, "0"); // Zero-padded
      return `${hours}:${minutes}:${seconds}`;
    },
    unique: false,
  },

  drinks: [
    {
      drinkName: { type: String, unique: false, required: false },
      quantity: { type: String, unique: false, required: false },
      drink_id: { type: String, unique: false, required: false },
      drink_item_active:{ type: String, unique: false, required: true, default: "0" }
    },
  ],

  dishes: [
    {
      foodName: { type: String, unique: false, required: false },
      food_id: { type: String, unique: false, required: false },
      quantity: { type: String, unique: false, required: false },
      dish_item_active:{ type: String, unique: false, required: true, default: "0" },
      type: {type :String, unique : false, required : true},
      //0 -veg
      //1-non veg
      //2 -egg
  
    },
  ],
});


var OrdersSchema = _Orders;
// compile schema to model
var Orders = mongoose.model("Orders", OrdersSchema, "orders");
module.exports = Orders;
