const schemas = require("../../mongodb/schemas/schemas");

const GetBillByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Missing date parameters' });
  }

  try {
    const bills = await schemas.Bills.find({
      date1: { $gte: startDate, $lte: endDate },
    }).exec();
    res.json(bills);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = GetBillByDate;
