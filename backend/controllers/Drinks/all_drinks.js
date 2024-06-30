const schemas = require("../../mongodb/schemas/schemas");

const GetAllDrinks = async (req, res) => {
  try {
    const drinks = await schemas.Drink.find({ });
    
    if (drinks.length === 0) {
      return res.status(404).json({ message: "No drinks found." });
    }
    
    res.status(200).json({ drinks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetAllDrinks;