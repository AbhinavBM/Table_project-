const { DrinksCategory } = require("../../mongodb/schemas/schemas");

// Get all tables
const getAllDrinksCategory = async (req, res) => {
  try {
    const category_d = await DrinksCategory.find();
    res.status(200).json({ category_d });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

module.exports = getAllDrinksCategory;
