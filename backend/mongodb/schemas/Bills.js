const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const billSchem = new mongoose.Schema({
  user_id: {type :String, required : true},
  bills_id: { type: String, default: () => uuidv4() },
  name: {type :String, required : true},
  phoneNo: {type :String, required : true},
  tableNo: {type :String, required : true},
  otp: {type :String, required : true, unique:false},
  foodBillpaid: { type: String,default:"notPaid"},
  drinkBillpaid: { type: String,default:"notPaid"},
  clear: { type: String,default:"0"},
  donationAmount: {type :String, required : true, unique:false,default:"0"},
  membership_id: {type :String, required : false, unique:false},
  date1: {
    type: String,
    default: function() {
      const currentDate = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const istDate = new Date(currentDate.getTime() + istOffset);
      const year = istDate.getFullYear();
      const month = (istDate.getMonth() + 1).toString().padStart(2, '0'); // Zero-padded
      const day = istDate.getDate().toString().padStart(2, '0'); // Zero-padded
      return `${year}-${month}-${day}`;
    },
    unique: false,
  },

  time1: {
    type: String,
    default: function() {
      const currentDate = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const istTime = new Date(currentDate.getTime() + istOffset);
      const hours = istTime.getUTCHours().toString().padStart(2, '0'); // Zero-padded
      const minutes = istTime.getUTCMinutes().toString().padStart(2, '0'); // Zero-padded
      const seconds = istTime.getUTCSeconds().toString().padStart(2, '0'); // Zero-padded
      return `${hours}:${minutes}:${seconds}`;
    },
    unique: false,
  },

  DishItems: [{
    name: String,
    price: Number,
    quantity: Number,
    amount: Number,
  }],
  DrinkItems: [{
    name: String,
    price: Number,
    quantity: Number,
    amount: Number,

  }],
  grandTotal: {type :String, required : true, unique:false},
  dishTotal: {type :String, required : true,unique:false},
  drinkTotal: {type :String, required : true,unique:false},
  member_name:{type:String,required:false,unique:false},
    cgst: { type: Number, required: false },
    sgst: { type: Number, required: false },
    service_tax: { type: Number, required: false },
    discount:{type:String,required:false}
});

const billSchema = new mongoose.Schema(billSchem);

const Bills = mongoose.model("Bill", billSchema, "bills");

module.exports = Bills;