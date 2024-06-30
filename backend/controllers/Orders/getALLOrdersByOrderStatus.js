const schemas = require("../../mongodb/schemas/schemas");

const getOrderByOrderStatus = async (req, res) => {
  const orderStatus=req.params.orderStatus;
  try {

    const orders = await schemas.Orders.find({orderStatus:orderStatus});

    if (!orders) {
      return res.status(404).json({ message: `No Orders of order status ${orderStatus} found.` });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

module.exports = getOrderByOrderStatus;

