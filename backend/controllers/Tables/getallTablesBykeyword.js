const { Table } = require("../../mongodb/schemas/schemas");

const getTablesByLetter = async (req, res) => {
  try {
    const { letter } = req.params;
    
    if (!letter || letter.length !== 1) {
      return res.status(400).json({ message: "Invalid letter parameter" });
    }

    // Update the query to filter tables whose names start with the specified letter
    const tables = await Table.find({ tableNo: { $regex: `^${letter}`, $options: 'i' } });

    res.status(200).json({ tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tables" });
  }
};

module.exports = getTablesByLetter;
