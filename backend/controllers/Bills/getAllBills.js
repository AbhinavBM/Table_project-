const { Bills } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllBills= async (req, res) => {
  try {
    const bills = await Bills.find();
    res.status(200).json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};

module.exports = getAllBills;
