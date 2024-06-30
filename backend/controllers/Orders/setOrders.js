const schemas = require("../../mongodb/schemas/schemas");
const { GetAllConnectionsFromMongoDB, sendToAll } = require("../../server");

const SetOrders = async (req, res) => {
  const tableNo = req.body.tableNo;
  const user_id = req.body.user_id;
  const drinks = req.body.drinks;
  const dishes = req.body.dishes;
  const otp = req.body.otp;
  const member_name = req.body.member_name;

  try {
    if (!otp) {
      return res.status(400).json({ error: "OTP is required." });
    }

    const otpVerification = await schemas.OtpVerify.findOne({ otp });

    if (!otpVerification) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    const user = await schemas.User.findOne({ user_id });
    if (!user || user.userStatus == "1") {
      return res.status(403).json({ error: "User not found Or User Session Expired" });
    }

    if ((!dishes || dishes.length === 0) &&  (!drinks || drinks.length === 0)) {
      return res.status(405).json({ error: "Empty order cannot be placed." });
    }

    let invalidDishIds = [];
    if (dishes && dishes.length > 0) {
      invalidDishIds = await Promise.all(dishes.map(async (dish) => {
        const existingDish = await schemas.Food.findOne({ food_id: dish.food_id , foodStatus:0 });
        return !existingDish ? dish.food_id : null;
      }));
    }

    // Validate drinks
    let invalidDrinkIds = [];
    if (drinks && drinks.length > 0) {
      invalidDrinkIds = await Promise.all(drinks.map(async (drink) => {
        const existingDrink = await schemas.Drink.findOne({ drink_id: drink.drink_id , drinkStatus:0});
        return !existingDrink ? drink.drink_id : null;
      }));
    }

    const invalidDishIdsFiltered = invalidDishIds.filter(id => id !== null);
    const invalidDrinkIdsFiltered = invalidDrinkIds.filter(id => id !== null);

    if (invalidDishIdsFiltered.length > 0 || invalidDrinkIdsFiltered.length > 0) {
      const errorMessage = [];
      if (invalidDishIdsFiltered.length > 0) {
        errorMessage.push(`Some items are not available at the moment `);
      }
      if (invalidDrinkIdsFiltered.length > 0) {
        errorMessage.push(`Some items are not available at the moment`);
      }
      return res.status(403).json({
        error: errorMessage.join(' | '),
        invalidDishIds: invalidDishIdsFiltered,
        invalidDrinkIds: invalidDrinkIdsFiltered,
      });
    }

    const type0Dishes = [];
    const type12Dishes = [];
    let result1 = null;
    let orders1 = null;
    console.log(dishes?1:0)

    if(dishes)
    {for (const dish of dishes) {
      if (dish.type === "0") {
        type0Dishes.push(dish);
      } else if (dish.type === "1" || dish.type === "2") {
        type12Dishes.push(dish);
      }
    }}

    const foodOrderStatus = type0Dishes.length > 0 ? "0" : "2";
    const drinkOrderStatus = drinks && drinks.length > 0 ? "0" : "2";

    if(((drinks && drinks.length>0) || type0Dishes.length>0)){
      orders1 = new schemas.Orders({
      tableNo,
      user_id,
      drinks: drinks || [],
      dishes: type0Dishes,
      otp,
      foodOrderStatus,
      drinkOrderStatus,
      member_name,
    });}

    const type12DishesExist = type12Dishes.length > 0;

    let orders2 = null;

    if (type12DishesExist) {
      orders2 = new schemas.Orders({
        tableNo,
        user_id,
        drinks: [],
        dishes: type12Dishes,
        otp,
        foodOrderStatus: type12DishesExist ? "0" : "2",
        drinkOrderStatus: "2",
        member_name,
      });
    }

    if (orders1) {
      result1 = await orders1.save();
    }

    let result2 = null;

    if (orders2) {
      result2 = await orders2.save();
    }

    if (result2) {
      console.log(result2);
    }

    const connectedClients = await GetAllConnectionsFromMongoDB();

    if (result1) {
      await sendToAll(connectedClients, { privateMessage: result1 });
    }

    if (result2) {
      await sendToAll(connectedClients, { privateMessage: result2 });
    }

    return res.status(200).json({ result1, result2 });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.message });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(409)
        .json({ error: "Duplicate entry", details: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = SetOrders;