const schemas = require("../../mongodb/schemas/schemas");

const GetAllDishes = async (req, res) => {
  try {
    const dishes = await schemas.Food.find({});
    
    if (dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found." });
    }
    
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetAllDishes;
