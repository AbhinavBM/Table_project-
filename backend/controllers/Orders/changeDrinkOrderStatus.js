const schemas = require("../../mongodb/schemas/schemas");
const { GetAllConnectionsFromMongoDB, sendToAll } = require('../../server');


changeDrinkOrderStatus = async (req, res) => {
  try {
    const Orders_id = req.params.Orders_id;
    const newStatus = req.body.drinkOrderStatus;

    // Find the Staff by ID and update the Orders_id
    const updatedOrders = await schemas.Orders.findOne({ Orders_id });

    if (!updatedOrders) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the status change is allowed
    
      updatedOrders.drinkOrderStatus = newStatus;
      await updatedOrders.save();

      const connectedClients = await GetAllConnectionsFromMongoDB();
      await sendToAll(connectedClients, { privateMessage: updatedOrders });
      return res.json(updatedOrders);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = changeDrinkOrderStatus;
