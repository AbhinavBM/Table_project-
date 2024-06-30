const express = require('express');
const router = express.Router();

const apis = require("../controllers/api");
const { uploadFile } = require('../s3');
const multer = require('multer');
const upload = multer({ dest: '/tmp/' })



router.post('/setTable', (req, res) => { apis.setTables(req, res) });/*creates a new table*/
router.post('/createDish', upload.single('image'), async (req, res) => { apis.UploadDishes(req, res) });/*creates a new dish*/
router.post('/createDrink', upload.single('image'), async (req, res) => { apis.UploadDrinks(req, res) });/*creates a new dish*/
router.delete('/tables/:tableNo', (req, res) => { apis.deleteTable(req, res) });/*deletes a new table*/
router.delete('/dishes/:food_id', (req, res) => { apis.DeleteDishesByID(req, res) });/*deletes a  dish*/
router.delete('/drinks/:drink_id', (req, res) => { apis.DeleteDrinksByID(req, res) });/*deletes a new drink*/
router.delete('/drinksCategory/:drinks_Category_id', (req, res) => { apis.DeleteDrinksCategory(req, res) });/*deletes a new drink Category*/
router.delete('/dishCategory/:food_Category_id', (req, res) => { apis.DeleteDishesCategory(req, res) });/*deletes a new dish Catefory*/
router.post('/set_food_category', (req, res) => { apis.UploadDishesCategory(req, res) });/*creates a new Food Category*/
router.post('/set_drink_category', (req, res) => { apis.UploadDrinksCategory(req, res) });/*creates a new drink Category*/
router.post('/set_drink_category', (req, res) => { apis.UploadDrinksCategory(req, res) });/*creates a new drink Category*/
router.post('/SetRejected', (req, res) => { apis.SetRejected(req, res) });/*creates a new drink Category*/
router.put('/updateOrderById/:Orders_id', (req, res) => { apis.updateOrderById(req, res) });/*creates a new drink Category*/
router.get('/getAllMembersFormatted',(req,res) => {apis.getAllMembersFormatted(req,res)});/* a new */
router.get('/getMemberByMembershipId/:membership_id',(req,res) => {apis.getMemberByMembershipId(req,res)});/* a new */
router.get('/getAllRejectedItems',(req,res)=>{apis.getAllRejectedItems(req,res)})
router.get('/setDonation',(req,res)=>{apis.setDonation(req,res)})
router.patch('/updateFoodStatus/:food_id', (req, res) => { apis.updateFoodStatus(req, res) });/*creates a new drink Category*/
router.patch('/updateDrinkStatus/:drink_id', (req, res) => { apis.updateDrinkStatus(req, res) });/*creates a new drink Category*/

router.get('/changeAllFoodStatus/:foodStatus',(req,res) => {apis.changeAllFoodStatus(req,res)});/* a new */
router.get('/changeAllDrinkStatus/:drinkStatus',(req,res) => {apis.changeAllDrinkStatus(req,res)});/* a new */
router.patch('/updateDrink/:drink_id',(req,res)=>{apis.updateDrink(req,res)});
router.patch('/updateDishById/:food_id',(req,res)=>{apis.UpdateDishById(req,res)});
router.patch('/updateMemberById/:membership_id',(req,res)=>{apis.updateMemberById(req,res)});
router.patch('/updateBillById/:bills_id',(req,res)=>{apis.updateBillById(req,res)});



module.exports = router
