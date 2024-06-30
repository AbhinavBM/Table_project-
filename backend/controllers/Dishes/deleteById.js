const schemas = require("../../mongodb/schemas/schemas");


const DeleteDishById = async (req, res) => {
  const food_id = req.params.food_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedDish = await schemas.Food.findOne({food_id:food_id});

    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found." });
    }
    await schemas.Food.deleteOne({food_id});


    res.status(200).json({ message: "Dish deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteDishById;
