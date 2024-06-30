const schemas = require("../../mongodb/schemas/schemas");

updateFoodStatus=async (req, res) => {
  const food_id = req.params.food_id;
  const newStatus = req.body.foodStatus;

  try {
    const updatedFood = await schemas.Food.findOneAndUpdate(
        { food_id: food_id },
        { $set: { foodStatus: newStatus } },
        { new: true }
      );
    
    
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
module.exports = updateFoodStatus;
