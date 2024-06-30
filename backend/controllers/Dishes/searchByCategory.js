const schemas = require("../../mongodb/schemas/schemas");

const GetDishesByCategory = async (req, res) => {
  const category = req.params.category; // Assuming the category is passed as a parameter in the request URL

  try {
    const dishes = await schemas.Food.find({ foodCategories: category,foodStatus: "0" });
    
    if (dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found for the given category." });
    }
    
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetDishesByCategory;
