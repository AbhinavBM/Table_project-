const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

// Define the enum for whichWaiter

const _Staff = new Schema({
    name: { type: String, required: false },
    phoneNo: { type: String, required: false },
    tableNoAssigned: { type: String, default: null, required: false },
    staff_id: { type: String, default: () => uuidv4() },
    Orders_id: { type: String, default: null, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    whichWaiter: { type: String, enum: ["food", "drink"], required: false },    
});

var StaffSchema = _Staff;
// compile schema to model
var Staff = mongoose.model('Staff', StaffSchema, 'staff');
module.exports = Staff;
