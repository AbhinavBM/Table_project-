const { Orders } = require("../../mongodb/schemas/Orders");
const schemas = require("../../mongodb/schemas/schemas");

changeOrderActive = async (req, res) => {
  try {
    const Orders_id = req.params.Orders_id;

    const updatedOrders = await schemas.Orders.findOne({Orders_id:Orders_id});

    if (!updatedOrders) {
      return res.status(404).json({ error: 'Order not found' });
    }
    updatedOrders.order_active  = active;
    await updatedOrders.save();

    return res.json(updatedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = changeOrderActive;
