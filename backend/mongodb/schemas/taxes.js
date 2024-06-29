const mongoose = require("mongoose");
const { Schema } = mongoose;
const taxSchema = new Schema({
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    service_tax: { type: Number, required: true },
});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;