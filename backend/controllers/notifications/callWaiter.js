const { Notification } = require("../../mongodb/schemas/schemas");
const { GetAllConnectionsFromMongoDB, sendToAll } = require('../../server');

const callWaiter = async (req, res) => {
  try {
    const { username, phoneNumber, otp, user_id, tableNo } = req.body;

    const newNotification = new Notification({
      username,
      phoneNumber,
      otp,
      user_id,
      tableNo
    });

    const savedNotification = await newNotification.save();

    // Get all connected WebSocket clients
    const connectedClients = await GetAllConnectionsFromMongoDB();

    // Notify all connected clients about the new notification
    await sendToAll(connectedClients, { publicMessage: savedNotification });

    return res.status(200).json(savedNotification);
  } catch (error) {
    console.error(error);

    // Handle specific error cases and return appropriate status codes
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({ error: 'Duplicate entry', details: error.message });
    }

    // For other unexpected errors, return a 500 Internal Server Error
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = callWaiter;
