const { DrinkManager } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAlldrinksManager = async (req, res) => {
  try {
    const drinkManager = await DrinkManager.find();
    res.status(200).json({ drinkManager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch drink Manager" });
  }
};

module.exports = getAlldrinksManager;
