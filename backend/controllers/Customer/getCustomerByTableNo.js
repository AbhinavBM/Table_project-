const schemas = require("../../mongodb/schemas/schemas");

const getCustomerByTableNo = async (req, res) => {
  try {
    const { tableNo } = req.body; // List of table numbers passed in the request body

    // Find users based on the provided table numbers and status is 0
    const users = await schemas.User.find({ tableNo: { $in: tableNo }, userStatus: "0" });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getCustomerByTableNo;
