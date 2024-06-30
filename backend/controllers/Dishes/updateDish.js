const schemas = require("../../mongodb/schemas/schemas");

const UpdateDishById = async (req, res) => {
  const food_id = req.params.food_id;
  const updatedFields = req.body; 

  try {
    const updatedDish = await schemas.Food.findOneAndUpdate(
      { food_id: food_id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = UpdateDishById;
