const { Table } = require("../../mongodb/schemas/schemas");

// Get all tables
const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json({ tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tables" });
  }
};

module.exports = getTables;
