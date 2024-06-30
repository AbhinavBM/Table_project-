const express = require('express');
const router = express.Router();
const apis = require("../controllers/api");
const { uploadFile } = require('../s3');
const multer = require('multer');
const upload   = multer({dest:'/tmp/'})
router.post('/setNewBills',(req,res) => {apis.SetNewBills(req,res)});/*creates a new bills*/
router.get('/getAllBills',(req,res) => {apis.getAllBills(req, res)});//all bills

router.get('/getBillsByOtp/:otp',(req,res) => {apis.getBillsByOtp(req,res)});/* get dishes by id*/
router.get('/getBillsByTableNo/:TableNo',(req,res) => {apis.getBillsByTableNo(req,res)});/* get dishes by id*/
router.delete('/deleteBillsByOtp/:otp',(req,res) => {apis.deleteBillsByOtp(req,res)});/*deletes a new drink*/

router.delete('/deleteBillsById/:bills_id',(req,res) => {apis.deleteBillsById(req,res)});/*deletes a new drink*/
router.post('/updateBillAmount/:bills_id',(req,res) => {apis.updateBillAmount(req,res)});/*creates a new */
router.get('/GetBillById/:bills_id',(req,res) => {apis.GetBillById(req,res)});/* get dishes by id*/
router.get('/getOrderByOrderStatus/:orderStatus',(req,res)=>{apis.getALLOrdersByOrderStatus(req,res)});
router.post('/setTaxes',(req,res)=>{apis.setTaxes(req,res)}) /* set taxes by super admin */
router.get('/getTaxes',(req,res)=>{apis.getTaxes(req,res)});
router.post('/changeOrderStatus/:Orders_id',(req,res) => {apis.changeOrderStatus(req,res)});/*creates a new */
router.post('/changeOrderActive/:Orders_id',(req,res) => {apis.changeOrderActive(req,res)});/*creates a new */
router.post('/changeFoodOrderActive/:Orders_id',(req,res) => {apis.orderFoodActiveController(req,res)});/*creates a new */
router.post('/changeDrinkOrderActive/:Orders_id',(req,res) => {apis.orderDrinkActiveController(req,res)});/*creates a new */


router.post('/changeFoodOrderStatus/:Orders_id',(req,res) => {apis.changeFoodOrderStatus(req,res)});/*creates a new */
router.post('/changeDrinkOrderStatus/:Orders_id',(req,res) => {apis.changeDrinkOrderStatus(req,res)});/*creates a new */



router.post('/setFoodManager',(req,res) => {apis.setFoodManager(req,res)});/*creates a new setFoodManager*/
router.delete('/DeletefoodManagerById/:manager_id',(req,res) => {apis.DeletefoodManagerById(req,res)});/*deletes a new table*/
router.post('/FoodManagerLogin',(req,res) => {apis.FoodManagerLogin(req,res)});/*staff login*/
router.get('/getAllFoodMangaer/',(req,res) => {apis.getAllFoodMangaer(req,res)});/*creates a new Staff*/
router.get('/GetdfoodManagerById/:manager_id',(req,res) => {apis.GetdfoodManagerById(req,res)});/*creates a new Staff*/


router.post('/addDrinksManager',(req,res) => {apis.addDrinksManager(req,res)});/*creates a new setFoodManager*/
router.delete('/DeletedrinkManagerById/:manager_id',(req,res) => {apis.DeletedrinkManagerById(req,res)});/*deletes a new table*/
router.post('/DrinkManagerLogin',(req,res) => {apis.DrinkManagerLogin(req,res)});/*staff login*/
router.get('/getAlldrinksManager/',(req,res) => {apis.getAlldrinksManager(req,res)});/*creates a new Staff*/
router.get('/GetdrinkManagerById/:manager_id',(req,res) => {apis.GetdrinkManagerById(req,res)});/*creates a new Staff*/
 
router.get('/getRunningBillByUserId/:user_id', (req, res) => { apis.getRunningBillByUserId(req, res) });

router.get('/GetBillByTableNo/:tableNo', (req, res) => { apis.GetBillByTableNo(req, res) });

router.get('/getMemberByPhoneNO/:phoneNo', (req, res) => { apis.getMemberByPhoneNO(req, res) });
router.post('/SetMembers',(req,res) => {apis.SetMembers(req,res)});/*staff login*/

router.post('/updatePaid/:bills_id',(req,res) => {apis.updateBillStatus(req,res)});/*creates a new */
router.post('/updateDrinkBillStatus/:bills_id',(req,res) => {apis.updateDrinkBillStatus(req,res)});/*creates a new */
router.post('/updateFoodBillStatus/:bills_id',(req,res) => {apis.updateFoodBillStatus(req,res)});/*creates a new */

router.delete('/DeleteMemberById/:membership_id',(req,res) => {apis.DeleteMemberById(req,res)});/*deletes a new table*/
router.get('/GetBillByDate/:startDate/:endDate', (req, res) => { apis.GetBillByDate(req, res) });

router.get('/GetOrdersByDate/:date1', (req, res) => { apis.GetOrderslByDate(req, res) });

router.get('/total-expenditure/:membership_id', (req, res) => { apis.totalExpenditure(req, res) });

router.get('/DeleteCustomerById/:user_id', (req, res) => { apis.DeleteCustomerById(req, res) });


module.exports = router
