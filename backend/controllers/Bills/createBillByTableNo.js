const schemas = require("../../mongodb/schemas/schemas");

const createBillByTableNo = async (req, res) => {
  const tableNo = req.params.tableNo;
  
  try {
    const userOrders = await schemas.Orders.find({ tableNo: tableNo });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = createBillByTableNo;
