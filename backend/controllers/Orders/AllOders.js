const schemas = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllOrders = async (req, res) => {
  try {
    const orders = await schemas.Orders.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};

module.exports = getAllOrders;

//
