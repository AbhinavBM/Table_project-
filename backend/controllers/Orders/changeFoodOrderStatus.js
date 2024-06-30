const schemas = require("../../mongodb/schemas/schemas");
const { GetAllConnectionsFromMongoDB, sendToAll } = require('../../server');

changeFoodOrderStatus = async (req, res) => {
  try {
    const Orders_id = req.params.Orders_id;
    const orderStatus = req.body.foodOrderStatus;

    const updatedOrders = await schemas.Orders.findOne({ Orders_id: Orders_id });

    if (!updatedOrders) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the orderStatus transition is valid
   
      updatedOrders.foodOrderStatus = orderStatus;
      await updatedOrders.save();

      const connectedClients = await GetAllConnectionsFromMongoDB();

      await sendToAll(connectedClients, { privateMessage: updatedOrders });
      return res.json(updatedOrders);
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = changeFoodOrderStatus;
