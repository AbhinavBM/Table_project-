const { User } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllCustomers= async (req, res) => {
  try {
    const customer = await User.find({userStatus: "0" });
    res.status(200).json({ customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customer" });
  }
};

module.exports = getAllCustomers;
