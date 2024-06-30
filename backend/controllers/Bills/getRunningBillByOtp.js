const schemas = require("../../mongodb/schemas/schemas");

const getRunningBillByOtp = async (req, res) => {
  const { otp } = req.params;

  try {
    const userOrders = await schemas.Orders.find({
      otp: otp,
    });

    const user1= await schemas.OtpVerify.find({otp:otp})
    
    console.log(user1)

    const user = await schemas.User.find({ user_id: user1[0].user_id });



    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No accepted orders found for the table." });
    }

    const taxes = await schemas.Tax.findOne();

    const billDetails = {
      otp: otp,
      DishItems: [],
      DrinkItems: [],
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

    var dishTotal = billDetails.DishItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    var drinkTotal = billDetails.DrinkItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    // let donationAmount1; // Declare the variable outside the if-else block

    // if (userDonation != 0) {
    //   donationAmount1 = parseFloat(userDonation);
    // } else {
    //   donationAmount1 = parseFloat(donationAmount);
    // }
    

  //donationAmount1 = billDetails.donationAmount = donationAmount1;
    const cgst = parseFloat(taxes.cgst);
    const sgst = parseFloat(taxes.sgst);
    const service_tax = parseFloat(taxes.service_tax);
    dishTotal = (dishTotal * cgst)*0.01 + (dishTotal * sgst)*0.01+ dishTotal;
    drinkTotal = (drinkTotal * cgst)*0.01 + (drinkTotal * sgst)*0.01+ drinkTotal;
    if(dishTotal==0) 
    drinkTotal+=service_tax;
  else if(drinkTotal==0)
    dishTotal+=service_tax;
  else
  drinkTotal+=service_tax;
  dishTotal+=service_tax;

    billDetails.donationAmount = user[0].donationAmount;  

    billDetails.cgst = taxes.cgst;
    billDetails.sgst = taxes.sgst;
    billDetails.service_tax = taxes.service_tax;

    billDetails.grandTotal = dishTotal + drinkTotal+service_tax;
    billDetails.dishTotal = dishTotal;
    billDetails.drinkTotal = drinkTotal;
    billDetails.otp=otp;

    res.status(200).json({ billDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getRunningBillByOtp;