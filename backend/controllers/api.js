const GetAllTables = require("./Tables/getAllTables");
const setTables = require("./Tables/setTables");
const deleteTable = require("./Tables/delete_table");
const GetDishesByCategory = require("./Dishes/searchByCategory");
const UploadDishes = require("./Dishes/add_Dishes");
const GetAllDishes = require("./Dishes/alll_Dishes");
const DeleteDishesByID = require("./Dishes/deleteById");
const GetDishesByID = require("./Dishes/dishByID");
const GetDrinksByCategory = require("./Drinks/searchByCategory");
const UploadDrinks = require("./Drinks/add_drinks");
const GetAllDrinks = require("./Drinks/all_drinks");
const DeleteDrinksByID = require("./Drinks/deleteByid");
const GetDrinksByID = require("./Drinks/drinksById");
const getAllDrinksCategory = require("./drinks_category/getAllCategory");
const getAllDishesCategory = require("./food_category/getAllCategory");
const DeleteDrinksCategory = require("./drinks_category/DeleteCategory");
const DeleteDishesCategory = require("./food_category/DeleteCategory");
const UploadDrinksCategory = require("./drinks_category/setCategory");
const UploadDishesCategory = require("./food_category/setCategory");
const getOtpByUserId = require("./authentication/user-otp_verify");
const getOtpByStaffId = require("./authentication/staff-otp_verify");
const addStaff = require("./staff/addStaff");
const allStaff = require("./staff/allstaff");
const getStaffById = require("./staff/staffById");
const StaffLogin = require("./staff/staffLogin");
const staffByTableNo = require("./staff/staffByTableNo");
const StaffupdateOrdersId = require("./staff/updateStaff-Orders_id");
const StaffupdateTableNoAssigned = require("./staff/update-staff-table");
const DeleteStaffsById = require("./staff/deleteStaffById");
const setUser = require("./Customer/addCustomer");
const customerStatus = require("./Customer/updateCustomerstatus");
const getAllCustomers = require("./Customer/getAllCustomer");
const SetOrders = require("./Orders/setOrders");
const changeOrderStatus = require("./Orders/changeOrderStatus");
const changeOrderActive = require("./Orders/changeOrder_active");
const DeleteOrdersById = require("./Orders/deleteOrders");
const SetNewBills = require("./Bills/setnewBill");
const getAllBills = require("./Bills/getAllBills");
const getBillsByOtp = require("./Bills/billByOtp");
const getBillsByTableNo = require("./Bills/billByTableNo");
const deleteBillsByOtp = require("./Bills/DeleteBillByOtp");
const deleteBillsById = require("./Bills/DeleteBillbyId");
const updateBillAmount = require("./Bills/updateBillamount");
const createBillByUserId=require("./Bills/createBillByUserId");
const GetBillById = require("./Bills/billById");
const getAllOrders = require("./Orders/AllOders");
const getOrderById = require("./Orders/getOrderById");
const getOrderByUserId = require("./Orders/getOrdersByUserId");
const getTaxes=require('./Taxes/getTaxes');
const setTaxes=require('./Taxes/setTaxes');
const callWaiter=require('./notifications/callWaiter');
const getAllNotification=require('./notifications/getAllNotifications');
const getNotificationsByTableNo=require('./notifications/getNotificationsByTableNo ');
const getNotificationsByUserId=require('./notifications/getNotificationByUserId');
const getRunningBillByUserId = require("./Bills/getRunningBillByUserId");
const verifyOtp=require('./authentication/verify-otp');
const getRunningBillByTableNo=require('./Bills/getRunningBillByTableNo');
const updateNotification=require('./notifications/updateNotification')
const setFoodManager=require('./foodManager/addfoodManager');
const getAllFoodMangaer=require('./foodManager/allFoodManagers');
const DeletefoodManagerById=require('./foodManager/deleteFoodManager');
const GetdfoodManagerById=require('./foodManager/getFoodManagerById');
const FoodManagerLogin=require('./foodManager/foodManagerLogin');
const addDrinksManager=require('./drinkManager/addDrinksManager');
const getAlldrinksManager=require('./drinkManager/getAlldrinksManager');
const DeletedrinkManagerById=require('./drinkManager/DeletedrinkManagerById');
const GetdrinkManagerById=require('./drinkManager/GetdrinkManagerById');
const DrinkManagerLogin=require('./drinkManager/DrinkManagerLogin');
const getOrderReady=require('./Orders/getOrdersReady');
const orderFoodActiveController=require('./Orders/orderFoodActiveController')
const orderDrinkActiveController=require('./Orders/orderDrinkActiveController')
const changeItemStatus=require('./Orders/changeItemStatus');
const getAllRejectedItems=require('./RejectedItems/getAllRejectedItems');
const getALLOrdersByOrderStatus=require('./Orders/getALLOrdersByOrderStatus');
const GetBillByTableNo =require('./Bills/billByTableNo');
const SetMembers =require('./members/addMembers');
const getMemberByPhoneNO =require('./members/getMemberByphoneNo');
const SetRejected =require('./RejectedItems/setRejectedItems');
const updateOrderById = require("./Orders/updateOrder");
const getAllMemberNames = require("./members/getAllMemberName");
const getMemberDetailsByName = require("./members/getMemberDetailsByName");
const getCustomerByTableNo = require("./Customer/getCustomerByTableNo");
const changeFoodOrderStatus=require('./Orders/changeFoodOrderStatus');
const changeDrinkOrderStatus=require('./Orders/changeDrinkOrderStatus');
const getOrdersByFoodOrderStatus=require('./Orders/getOrdersByFoodOrderStatus');
const getOrdersByDrinkOrderStatus=require('./Orders/getOrdersByDrinkOrderStaus');
const getAllMembers=require('./members/allMembers');
const getAllMembersFormatted =require('./members/member+id'); 
const updateFoodBillStatus =require('./Bills/updateFoodBillPaid'); 
const updateDrinkBillStatus=require('./Bills/updateDrinkBill'); 
const getMemberByMembershipId =require('./members/getMemberById'); 
const DeleteMemberById =require('./members/deleteMemberById'); 
const getRunningBillByOtp=require("./Bills/getRunningBillByOtp");
const setDonation=require("./Bills/setDonation");
const getRejectedItemsByOrderId=require("./RejectedItems/getRejectedItemsByOrderId")
const updateFoodStatus = require('./Dishes/changeFoodStatus')
const updateDrinkStatus = require('./Drinks/updateDrinkStatus')
const GetBillByDate = require('./Bills/billByDate')
const GetOrderslByDate = require('./Orders/getOrdersByDate')
const totalExpenditure = require('./Bills/totalExpenditure')
const changeAllDrinkStatus = require('./Drinks/changeAllDrinkStatus')
const changeAllFoodStatus = require('./Dishes/changeAllFoodStatus')
const updateDrink=require("./Drinks/updateDrink");
const UpdateDishById=require("./Dishes/updateDish");
const updateMemberById=require("./members/updateMemberById");
const updateBillById=require("./Bills/updateBillById");
const UserByOtp = require('./authentication/userIDbyOtp');
const getTablesByLetter = require('./Tables/getallTablesBykeyword');
const setDonationByUserId = require('./Customer/setDonationByUserId');
const FoodSearch = require("./Dishes/dishSearch");  
const DrinkSearch = require("./Drinks/searchDrink");  
const DeleteItemFromBill = require("./Orders/deleteOrderFromRunningBill");  

const DeleteCustomerById = require("./Customer/deleteCustomer");  

var apis = {

//http
DeleteCustomerById:DeleteCustomerById,
DeleteItemFromBill:DeleteItemFromBill,
DrinkSearch:DrinkSearch,
FoodSearch:FoodSearch,
setDonationByUserId:setDonationByUserId,
//http
getTablesByLetter:getTablesByLetter,
UserByOtp:UserByOtp,
UpdateDishById:UpdateDishById,
updateDrink:updateDrink,
updateMemberById:updateMemberById,
updateBillById:updateBillById,
changeAllFoodStatus:changeAllFoodStatus,
  changeAllDrinkStatus:changeAllDrinkStatus,
  totalExpenditure:totalExpenditure,
  GetOrderslByDate:GetOrderslByDate,
  GetBillByDate:GetBillByDate,
  updateDrinkStatus:updateDrinkStatus,
  updateFoodStatus:updateFoodStatus,
  DeleteMemberById:DeleteMemberById,
  getRunningBillByOtp:getRunningBillByOtp,
  updateDrinkBillStatus:updateDrinkBillStatus,
  updateFoodBillStatus:updateFoodBillStatus,
  getAllMembersFormatted:getAllMembersFormatted,
  getMemberByMembershipId:getMemberByMembershipId,
  getAllMembers:getAllMembers,
  changeFoodOrderStatus:changeFoodOrderStatus,
  changeDrinkOrderStatus:changeDrinkOrderStatus,
  getRejectedItemsByOrderId:getRejectedItemsByOrderId,
  getOrdersByFoodOrderStatus:getOrdersByFoodOrderStatus,
  getOrdersByDrinkOrderStatus:getOrdersByDrinkOrderStatus,

  GetAllTables: GetAllTables,
  setTables: setTables,
  getALLOrdersByOrderStatus:getALLOrdersByOrderStatus,
  verifyOtp:verifyOtp,
  
  deleteTable: deleteTable,
  GetDishesByCategory: GetDishesByCategory,

  UploadDishes: UploadDishes,
  GetAllDishes: GetAllDishes,

  DeleteDishesByID: DeleteDishesByID,
  GetDishesByID: GetDishesByID,

  GetDrinksByCategory: GetDrinksByCategory,
  UploadDrinks: UploadDrinks,

  GetAllDrinks: GetAllDrinks,
  DeleteDrinksByID: DeleteDrinksByID,

  GetDrinksByID: GetDrinksByID,

  getAllDrinksCategory: getAllDrinksCategory,
  getAllDishesCategory: getAllDishesCategory,

  DeleteDrinksCategory: DeleteDrinksCategory,
  DeleteDishesCategory: DeleteDishesCategory,
  UploadDrinksCategory: UploadDrinksCategory,
  UploadDishesCategory: UploadDishesCategory,
  getOtpByUserId: getOtpByUserId,
  getOtpByStaffId: getOtpByStaffId,
  addStaff: addStaff,
  allStaff: allStaff,
  getStaffById: getStaffById,
  StaffupdateTableNoAssigned: StaffupdateTableNoAssigned,
  StaffLogin: StaffLogin,
  StaffupdateOrdersId: StaffupdateOrdersId,
  staffByTableNo: staffByTableNo,
  
  setUser: setUser,
  customerStatus: customerStatus,

  getAllCustomers: getAllCustomers,
  DeleteStaffsById: DeleteStaffsById,

  getAllRejectedItems:getAllRejectedItems,

  getAllBills: getAllBills,
  SetNewBills: SetNewBills,
  getBillsByOtp: getBillsByOtp,
  getBillsByTableNo: getBillsByTableNo,
  deleteBillsByOtp: deleteBillsByOtp,
  deleteBillsById: deleteBillsById,
  updateBillAmount: updateBillAmount,
  GetBillById: GetBillById,
  createBillByUserId:createBillByUserId,
  changeItemStatus:changeItemStatus,
  //Order Apis
  getAllOrders: getAllOrders,
  DeleteOrdersById: DeleteOrdersById,
  changeOrderStatus: changeOrderStatus,
  changeOrderActive: changeOrderActive,
  SetOrders: SetOrders,
  getOrderById: getOrderById,
  getOrderByUserId: getOrderByUserId,
  orderFoodActiveController:orderFoodActiveController,
  orderDrinkActiveController:orderDrinkActiveController,

  //Taxes Apis
  getTaxes:getTaxes,
  setTaxes:setTaxes,
  getOrderReady:getOrderReady,
  //Notification apis
  callWaiter:callWaiter,
  getAllNotification:getAllNotification,
  getNotificationsByTableNo:getNotificationsByTableNo,
  getNotificationsByUserId:getNotificationsByUserId,

  //bills
  getRunningBillByUserId:getRunningBillByUserId,
  updateNotification:updateNotification,
  getRunningBillByTableNo:getRunningBillByTableNo,
  setFoodManager:setFoodManager,
  getAllFoodMangaer:getAllFoodMangaer,
  DeletefoodManagerById:DeletefoodManagerById,
  GetdfoodManagerById:GetdfoodManagerById,
  FoodManagerLogin:FoodManagerLogin,
  addDrinksManager:addDrinksManager,
getAlldrinksManager:getAlldrinksManager,
DeletedrinkManagerById:DeletedrinkManagerById,
GetdrinkManagerById:GetdrinkManagerById,
DrinkManagerLogin:DrinkManagerLogin,
GetBillByTableNo:GetBillByTableNo,
SetMembers:SetMembers,
getMemberByPhoneNO:getMemberByPhoneNO,
SetRejected:SetRejected,
updateOrderById:updateOrderById,
getAllMemberNames:getAllMemberNames,
getMemberDetailsByName:getMemberDetailsByName,
getCustomerByTableNo:getCustomerByTableNo,
};

module.exports = apis;
