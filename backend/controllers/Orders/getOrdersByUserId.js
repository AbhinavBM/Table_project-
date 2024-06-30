const schemas = require("../../mongodb/schemas/schemas");

const getOrderByUserId = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    console.log({user_id:user_id})
    const matchingOrders = await schemas.Orders.find({ user_id: user_id });

    if (matchingOrders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for the given user_id." });
    }

    res.status(200).json({ success: true, data: matchingOrders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getOrderByUserId;
