const Tax= require('./taxes')
const Food = require('./Food');
const Drink = require('./drinks');
const DrinkManager = require('./drinksManager');
const FoodManager = require('./foodManager');
const Orders = require('./Orders');
const RejectedItems = require('./rejected_items');
const Staff = require('./staff');
const superAdmin = require('./superAdmin');
const Table = require('./table');
const User = require('./user');
const FoodCategory = require('./food_category');
const DrinksCategory = require('./drinks_category');
const OtpVerify  = require('./otp');
const Bills  = require('./Bills');
const Notification=require('./notifications');
const Members = require('./member');

var schemas = {
    Food:Food,
    Drink:Drink,
    DrinkManager:DrinkManager,
    FoodManager:FoodManager,
    Orders:Orders,
    RejectedItems,RejectedItems,
    Staff:Staff,
    superAdmin:superAdmin,
    Table:Table,
    User:User,
    FoodCategory:FoodCategory,
    DrinksCategory:DrinksCategory, 
    OtpVerify:OtpVerify,
    Bills:Bills,
    Tax:Tax,
    Notification:Notification,
    Members:Members,
}

module.exports = schemas;