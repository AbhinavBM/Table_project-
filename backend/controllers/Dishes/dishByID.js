const schemas = require("../../mongodb/schemas/schemas");

const GetDishById = async (req, res) => {
  const food_id = req.params.food_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const dish = await schemas.Food.findOne({food_id:food_id});

    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    res.status(200).json({food_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetDishById;

