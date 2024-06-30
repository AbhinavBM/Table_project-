const schemas = require("../../mongodb/schemas/schemas");

const createBillByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  const donationAmount = req.params.donationAmount;
  const membership_id = req.params.membership_id;

  try {

    const user1 = await schemas.User.findOne({ user_id: user_id });
    if (!user1) {
      return res.status(404).json({ message: "User not found." });
    }
    const member_info = await schemas.Members.findOne({membership_id:membership_id})


    if (user1.userStatus !== "0") {
      return res.status(403).json({ message: "User status is not allowed to create a bill." });
    }
    const userDonation = user1.donationAmount;
    const taxes = await schemas.Tax.findOne();
    const userOrders = await schemas.Orders.find({ user_id: user_id });
    const user= await schemas.User.find({ user_id: user_id });
    const otp=await schemas.OtpVerify.findOne({ user_id: user_id });
    console.log(otp.otp)
    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for the user." });
    }

    const allOrdersCompleted = userOrders.every(order => 
      order.foodOrderStatus === "2" && order.drinkOrderStatus === "2"
    );
    if (!allOrdersCompleted) {
      return res.status(400).json({ message: "Orders not fully completed yet." });
    }

    const billDetails = {
      user_id: user_id,
      DishItems: [],
      DrinkItems: [],
      name: user[0].name,    
      phoneNo: user[0].phoneNo, 
      tableNo: user[0].tableNo,
      membership_id:membership_id,
      member_name:member_info.name,

    };

    
    for (const order of userOrders) {
      for (const dish of order.dishes) {
        const dishInfo = await schemas.Food.findOne({
          food_id: dish.food_id,
        });
        var dishTotal = parseInt(dish.quantity) * parseFloat(dishInfo.foodPrice);
        
        // Calculate tax for this dish item
        const dishTaxAmount = (dishTotal * parseFloat(dishInfo.tax)) / 100;
        dishTotal += dishTaxAmount;

        billDetails.DishItems.push({
          name: dishInfo.foodName,
          price: parseFloat(dishInfo.foodPrice),
          quantity: parseInt(dish.quantity),
          amount: dishTotal,
          tax: dishTaxAmount,
        });
      }

      for (const drink of order.drinks) {
        const drinkInfo = await schemas.Drink.findOne({
          drink_id: drink.drink_id,
        });
        var drinkTotal = parseInt(drink.quantity) * parseFloat(drinkInfo.drinkNamePrice);
        
        // Calculate tax for this drink item
        const drinkTaxAmount = (drinkTotal * parseFloat(drinkInfo.tax)) / 100;
        drinkTotal += drinkTaxAmount;
        
        billDetails.DrinkItems.push({
          name: drinkInfo.drinkName,
          price: parseFloat(drinkInfo.drinkNamePrice),
          quantity: parseInt(drink.quantity),
          amount: drinkTotal,
          tax: drinkTaxAmount,
        });
      }
    }

    var dishTotal = billDetails.DishItems.reduce((total, item) => total + item.amount, 0);
    var drinkTotal = billDetails.DrinkItems.reduce((total, item) => total + item.amount, 0);
    let donationAmount1; // Declare the variable outside the if-else block

    if (userDonation != 0) {
      donationAmount1 = parseFloat(userDonation);
    } else {
      donationAmount1 = parseFloat(donationAmount);
    }
    

  donationAmount1 = billDetails.donationAmount = donationAmount1;
    const cgst = parseFloat(taxes.cgst);
    const sgst = parseFloat(taxes.sgst);
    const service_tax = parseFloat(taxes.service_tax);
    dishTotal = (dishTotal * cgst)*0.01 + (dishTotal * sgst)*0.01+ dishTotal;
    drinkTotal = (drinkTotal * cgst)*0.01 + (drinkTotal * sgst)*0.01+ drinkTotal;
    if(dishTotal==0)
    {
    drinkTotal+=service_tax+donationAmount1;
    }
  else if(drinkTotal==0)
  {
    dishTotal+=service_tax+donationAmount1;
  }
  else
  {
  drinkTotal+=service_tax+donationAmount1;
  dishTotal+=service_tax;
  }

    billDetails.cgst = taxes.cgst;
    billDetails.sgst = taxes.sgst;
    billDetails.service_tax = taxes.service_tax;

    billDetails.grandTotal = dishTotal + drinkTotal+service_tax+donationAmount1;
    billDetails.dishTotal = dishTotal;
    billDetails.drinkTotal = drinkTotal;
    billDetails.otp=otp.otp;




    const bill = new schemas.Bills(billDetails);
    await bill.save();
    user1.userStatus = "1";
    await user1.save();


    res.status(200).json({ billDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};

module.exports = createBillByUserId;