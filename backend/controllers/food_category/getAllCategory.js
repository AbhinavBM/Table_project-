const { FoodCategory } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllFoodCategory = async (req, res) => {
  try {
    const category_d = await FoodCategory.find();
    res.status(200).json({ category_d });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

module.exports = getAllFoodCategory;
