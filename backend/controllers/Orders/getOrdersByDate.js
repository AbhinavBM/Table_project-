const schemas = require("../../mongodb/schemas/schemas");

const GetOrderslByDate = async (req, res) => {
  const targetDate = req.params.date1;

  if (!targetDate) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }

  try {
    const orders = await schemas.Orders.find({ date1: targetDate }).exec();
    res.json(orders);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = GetOrderslByDate;
