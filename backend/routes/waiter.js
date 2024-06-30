const express = require('express');
const router = express.Router();

const apis = require("../controllers/api");
const { uploadFile } = require('../s3');
const multer = require('multer');
const upload   = multer({dest:'/tmp/'})
const updateTableNoAssigned   = require('../controllers/staff/update-staff-table')
const StaffupdateOrdersId   = require('../controllers/staff/updateStaff-Orders_id')



router.get('/getAllOrders',(req,res) => {apis.getAllOrders(req, res)});//all ordersz
router.get('/getRunningBillByTableNo/:tableNo',(req,res)=>{apis.getRunningBillByTableNo(req,res)});
router.get('/getRunningBillByOtp/:otp',(req,res)=>{apis.getRunningBillByOtp(req,res)});

// router.delete('/dishCategory/:dish_category_id',(req,res) => {apis.DeleteDishesCategory(req,res)});/*deletes a new dish Catefory*/

router.post('/createStaff',(req,res) => {apis.addStaff(req,res)});/*creates a new Staff*/
router.delete('/deleteStaff/:staff_id',(req,res) => {apis.DeleteStaffsById(req,res)});/*deletes a new table*/
router.post('/login',(req,res) => {apis.StaffLogin(req,res)});/*staff login*/
router.get('/getAllStaff/',(req,res) => {apis.allStaff(req,res)});/*creates a new Staff*/
router.get('/getstaff/:staff_id',(req,res) => {apis.getStaffById(req,res)});/*creates a new Staff*/
router.get('/getOrderReady',(req,res)=>{apis.getOrderReady(req,res)});
 router.post('/set_drink_category',(req,res) => {apis.UploadDrinksCategory(req,res)});/*creates a new drink Category*/
 router.get('/getstaff/:tableNoAssigned',(req,res) => {apis.staffByTableNo(req,res)});/*creates a new Staff*/

 router.post('/updateTableNoAssigned/:staff_id',(req,res) => {apis.updateTableNoAssigned(req,res)});/*creates a new */
 router.post('/StaffupdateOrdersId/:staff_id',(req,res) => {apis.StaffupdateOrdersId(req,res)});/*creates a new */

 router.get('/getNotificationsByTableNo/:tableNo',(req,res)=>{apis.getNotificationsByTableNo(req,res)});
 router.get('/getAllNotifications',(req,res)=>{apis.getAllNotification(req,res)});
 router.get('/getNotificationsByUserId/:user_id',(req,res)=>{apis.getNotificationsByUserId(req,res)});

 
 router.get('/getTablesByLetter/:letter',(req,res)=>{apis.getTablesByLetter(req,res)});

 router.patch('/DeleteItemFromBill/',(req,res)=>{apis.DeleteItemFromBill(req,res)});

 
 
 
module.exports = router