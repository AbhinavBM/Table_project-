const { Staff } = require("../../mongodb/schemas/schemas");

// Get all tables
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};

module.exports = getStaff;
