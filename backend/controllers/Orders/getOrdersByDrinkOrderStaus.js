const schemas = require("../../mongodb/schemas/schemas");

const getDrinkByDrinkOrderStatus = async (req, res) => {

  const drinkOrderStatus = req.params.drinkOrderStatus;
  try {

    const orders = await schemas.Orders.find({ drinkOrderStatus: drinkOrderStatus });

    if (!orders) {
      return res.status(404).json({ message: `No Orders of order status ${drinkOrderStatus} found.` });
    }

    // Listen for 'newOrder' events and update the orders list
    // io.on('newOrder', (newOrder) => {
    //   // Add the new order to the existing orders list
    //   orders.push(newOrder);
    // });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getDrinkByDrinkOrderStatus;
