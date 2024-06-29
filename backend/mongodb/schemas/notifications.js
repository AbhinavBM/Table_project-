const mongoose = require('mongoose');
const {Schema}=mongoose;
const { v4: uuidv4 } = require('uuid');

const _Notifications=new Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  user_id: { type: String, required: true },
  tableNo: { type: String, required: true },
  stillActive: { type: String,default:"yes"},
  notification_id: {type: String, default: ()=> uuidv4()},

  //yes
  //no

})

const NotificationSchema=_Notifications;
const Notification=mongoose.model('Notification',NotificationSchema,'notifications');
module.exports = Notification;