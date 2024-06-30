const schemas = require("../../mongodb/schemas/schemas");

changeOrderStatus = async (req, res) => {
  try {
    const Orders_id = req.params.Orders_id;
    const orderStatus = req.body.orderStatus;

    const updatedOrders = await schemas.Orders.findOne({Orders_id:Orders_id});

    if (!updatedOrders) {
      return res.status(404).json({ error: 'Order not found' });
    }
    updatedOrders.orderStatus  = orderStatus;
    await updatedOrders.save();


    return res.json(updatedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = changeOrderStatus;
