const schemas = require("../../mongodb/schemas/schemas");

const GetDrinksByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const drinks = await schemas.Drink.find({ drinkCategories: category,drinkStatus:"0" });
    
    if (drinks.length === 0) {
      return res.status(404).json({ message: "No drinks found for the given category." });
    }
    
    res.status(200).json({ drinks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetDrinksByCategory;
