const schemas = require("../../mongodb/schemas/schemas"); // Import the RejectedItem model

const getAllRejectedItems = async (req, res) => {
  try {
    const rejectedItems = await schemas.RejectedItems.find();
    res.status(200).json({ rejectedItems });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getAllRejectedItems;
