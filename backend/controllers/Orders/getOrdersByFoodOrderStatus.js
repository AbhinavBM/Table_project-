// apis.js
const schemas = require("../../mongodb/schemas/schemas");

const getOrdersByFoodOrderStatus = async (req, res) => {
  const foodOrderStatus = req.params.foodOrderStatus;
  try {
    const orders = await schemas.Orders.find({ foodOrderStatus: foodOrderStatus });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: `No Orders of order status ${foodOrderStatus} found.` });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  getOrdersByFoodOrderStatus ;
