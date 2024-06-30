const schemas = require("../../mongodb/schemas/schemas");

const getRunningBillByTableNo = async (req, res) => {
  const { tableNo } = req.params;

  try {
    const userOrders = await schemas.Orders.find({
      tableNo: tableNo,
      order_active: '0',
    });
    
    const user = await schemas.User.find({ tableNo: tableNo });
    
    console.log(userOrders)
    
    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No accepted orders found for the table." });
    }
   
    const taxes = await schemas.Tax.findOne();

    const billDetails = {
      username: user[0].name,
      tableNo: tableNo,
      DishItems: [],
      DrinkItems: [],
    };

    for (const order of userOrders) {
      for (const dish of order.dishes) {
        if (dish.dish_item_active !== "1") {
          const dishInfo = await schemas.Food.findOne({
            food_id: dish.food_id,
          });
          const dishTotal = parseInt(dish.quantity) * parseFloat(dishInfo.foodPrice);
          billDetails.DishItems.push({
            name: dishInfo.foodName,
            price: parseFloat(dishInfo.foodPrice),
            quantity: parseInt(dish.quantity),
            amount: dishTotal,
          });
        }
      }

      for (const drink of order.drinks) {
        if (drink.drink_item_active !== "1") {
          const drinkInfo = await schemas.Drink.findOne({
            drink_id: drink.drink_id,
          });
          const drinkTotal = parseInt(drink.quantity) * parseFloat(drinkInfo.drinkNamePrice);
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

    billDetails.grandTotal = grandTotal;
    billDetails.dishTotal = dishTotal;
    billDetails.drinkTotal = drinkTotal;
    billDetails.cgst = taxes.cgst;
    billDetails.sgst = taxes.sgst;

    res.status(200).json({ billDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getRunningBillByTableNo;
