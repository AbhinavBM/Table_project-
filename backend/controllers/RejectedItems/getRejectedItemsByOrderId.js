
const schemas = require("../../mongodb/schemas/schemas"); // Import the RejectedItem model

const getRejectedItemsByOrderId = async (req, res) => {
  const Orders_id=req.params.Orders_id;
  try {
    const rejectedItems = await schemas.RejectedItems.find({Orders_id:Orders_id});
    res.status(200).json({ rejectedItems });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getRejectedItemsByOrderId;
