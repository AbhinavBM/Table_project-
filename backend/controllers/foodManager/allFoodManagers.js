const { FoodManager } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllFoodMangaer = async (req, res) => {
  try {
    const foodManager = await FoodManager.find();
    res.status(200).json({ foodManager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Manager" });
  }
};

module.exports = getAllFoodMangaer;
