const express = require("express");
const router = express.Router();

const apis = require("../controllers/api");
const { removeAllConnectionsFromMongoDB1 } = require('../connect'); // Adjust the file path as needed

router.get("/getAllTables", (req, res) => {
  apis.GetAllTables(req, res);
});

router.get("/getDish/:category", (req, res) => {
  apis.GetDishesByCategory(req, res);
}); /* get dishes by category*/

router.get("/getAllDishes", (req, res) => {
  apis.GetAllDishes(req, res);
}); //all dishes

router.get("/getAllDrinks", (req, res) => {
  apis.GetAllDrinks(req, res);
}); //all drinks
router.post("/changeItemStatus", (req, res) => {
  apis.changeItemStatus(req, res);
});

router.get("/getDrink/:category", (req, res) => {
  apis.GetDrinksByCategory(req, res);
}); /* get drinks by category*/

router.get("/getDrinkByid/:drink_id", (req, res) => {
  apis.GetDrinksByID(req, res);
}); /* get drinks by id*/
router.get("/getDishByid/:food_id", (req, res) => {
  apis.GetDishesByID(req, res);
}); /* get dishes by id*/

router.get("/getAllDrinksCategories", (req, res) => {
  apis.getAllDrinksCategory(req, res);
});
router.get("/getAllDishesCategories", (req, res) => {
  apis.getAllDishesCategory(req, res);
});

router.get("/get-otp/user/:user_id", (req, res) => {
  apis.getOtpByUserId(req, res);
});
router.get("/get-otp/staff/:staff_id", (req, res) => {
  apis.getOtpByStaffId(req, res);
});

router.post("/createCustomer", (req, res) => {
  apis.setUser(req, res);
}); /*creates a new Staff*/

router.post("/updateCustomer/:user_id", (req, res) => {
  apis.customerStatus(req, res);
}); /*updates user status field*/

router.get("/getAllBills", (req, res) => {
  apis.getAllBills(req, res);
}); //all bills

router.get("/getAllCustomers", (req, res) => {
  apis.getAllCustomers(req, res);
}); //all bills

router.post("/setOrders", (req, res) => {
  apis.SetOrders(req, res);
}); /*updates user status field*/

router.post("/changeOrderStatus/:Orders_id", (req, res) => {
  apis.changeOrderStatus(req, res);
}); /*creates a new */
router.post("/changeOrderActive/:Orders_id", (req, res) => {
  apis.changeOrderActive(req, res);
}); /*creates a new */
router.get("/getAllOrders", (req, res) => {
  apis.getAllOrders(req, res);
}); //all orders

router.delete("/DeleteOrdersById/:Orders_id", (req, res) => {
  apis.DeleteOrdersById(req, res);
}); /*creates a new Staff*/

router.get("/getOrderById/:Orders_id", (req, res) => {
  apis.getOrderById(req, res);
});
router.get("/getOrderByUserId/:user_id", (req, res) => {
  apis.getOrderByUserId(req, res);
});
router.get("/createBillByUserId/:user_id/:donationAmount/:membership_id", (req, res) => {
  apis.createBillByUserId(req, res);
});

router.get("/getTaxes", (req, res) => {
  apis.getTaxes(req, res);
});
router.post("/verifyOtp", (req, res) => {
  apis.verifyOtp(req, res);
});
router.post("/callWaiter", (req, res) => {
  apis.callWaiter(req, res);
});

router.get("/updateNotification/:notification_id", (req, res) => {
  apis.updateNotification(req, res);
}); //all orders

router.get('/getOrderByOrderStatus/:orderStatus',(req,res)=>{apis.getALLOrdersByOrderStatus(req,res)});
router.get('/getOrdersByFoodOrderStatus/:foodOrderStatus',(req,res) => {apis.getOrdersByFoodOrderStatus(req,res)});/*creates a new */
router.get('/getOrdersByDrinkOrderStatus/:drinkOrderStatus',(req,res) => {apis.getOrdersByDrinkOrderStatus(req,res)});/*creates a new */

router.get('/getAllMemberNames',(req,res)=>{apis.getAllMemberNames(req,res)});
router.post('/getMemberDetailsByName',(req,res)=>{apis.getMemberDetailsByName(req,res)});
router.post('/getCustomerByTableNo',(req,res) => {apis.getCustomerByTableNo(req,res)});/*creates a new */
router.get('/getAllMembers/',(req,res) => {apis.getAllMembers(req,res)});/*creates a new */
router.get("/getRejectedItemsByOrderId/:Orders_id",(req,res)=>{apis.getRejectedItemsByOrderId(req,res)})

router.get("/getUserId/:otp/:tableNo",(req,res)=>{apis.UserByOtp(req,res)})

router.get("/FoodSearch/:keyword",(req,res)=>{apis.FoodSearch(req,res)})
router.get("/DrinkSearch/:keyword",(req,res)=>{apis.DrinkSearch(req,res)})

router.get("/setDonationByUserId/:user_id/:donationAmount", (req, res) => { apis.setDonationByUserId(req, res);});
router.get("/removeAllConnectionsFromMongoDB", (req, res) => {
  removeAllConnectionsFromMongoDB1(req, res);
});

module.exports = router;
