const schemas = require("../../mongodb/schemas/schemas");

const getOrderReady = async (req, res) => {

  try {
    const orders = await schemas.Orders.findOne({orderStatus:"2"});

    if (!orders) {
      return res.status(404).json({ message: "No Order ready for pickup." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

module.exports = getOrderReady;

