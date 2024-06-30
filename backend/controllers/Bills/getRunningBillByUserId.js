const schemas = require("../../mongodb/schemas/schemas");

const getRunningBillByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userOrders = await schemas.Orders.find({
      user_id: user_id,
      order_active: 0,
      //orderStatus: 2,
    });

    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No accepted orders found for the user." });
    }

    const user = await schemas.User.find({ user_id: user_id });
    const otp = await schemas.OtpVerify.findOne({ user_id: user_id });
    const taxes = await schemas.Tax.findOne();

    const billDetails = {
      user_id: user_id,
      DishItems: [],
      DrinkItems: [],
      name: user[0].name,
      phoneNo: user[0].phoneNo,
      tableNo: user[0].tableNo,
    };

    console.log(userOrders[0].dishes);
    for (const order of userOrders) {
      console.log(typeof order.food_active);
      if (order.food_active === "0") {
        for (const dish of order.dishes) {
          console.log(dish.dish_item_active === "1")
          if (dish.dish_item_active === "0") {
            const dishInfo = await schemas.Food.findOne({
              food_id: dish.food_id,
            });
            const dishTotal =
              parseInt(dish.quantity) * parseFloat(dishInfo.foodPrice);
            billDetails.DishItems.push({
              name: dishInfo.foodName,
              price: parseFloat(dishInfo.foodPrice),
              quantity: parseInt(dish.quantity),
              amount: dishTotal,
            });
          } else {
            console.log("rejcted", dish);
          }
          console.log(dish)
        }
      }

      if (order.drink_active === "0") {
        for (const drink of order.drinks) {
          if (drink.drink_item_active === "1") continue;
          const drinkInfo = await schemas.Drink.findOne({
            drink_id: drink.drink_id,
          });
          const drinkTotal =
            parseInt(drink.quantity) * parseFloat(drinkInfo.drinkNamePrice);
          billDetails.DrinkItems.push({
            name: drinkInfo.drinkName,
            price: parseFloat(drinkInfo.drinkNamePrice),
            quantity: parseInt(drink.quantity),
            amount: drinkTotal,
          });
        }
      }
    }

    const dishTotal = billDetails.DishItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    const drinkTotal = billDetails.DrinkItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    const grandTotal = dishTotal + drinkTotal;

    billDetails.dishTotal = dishTotal;
    billDetails.drinkTotal = drinkTotal;
    billDetails.otp = otp.otp;
    billDetails.cgst = taxes.cgst;
    billDetails.sgst = taxes.sgst;
    billDetails.grandTotal = grandTotal;
    
    res.status(200).json({ billDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getRunningBillByUserId;
