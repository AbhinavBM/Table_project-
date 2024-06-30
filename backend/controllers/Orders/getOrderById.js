const schemas = require("../../mongodb/schemas/schemas");

const getOrderById = async (req, res) => {
  const Orders_id = req.params.Orders_id;

  try {
    console.log({Orders_id:Orders_id})

    const orders = await schemas.Orders.findOne({Orders_id:Orders_id});

    if (!orders) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

module.exports = getOrderById;

