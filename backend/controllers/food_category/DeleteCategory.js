const schemas = require("../../mongodb/schemas/schemas");


const DeleteFoodCategoryById = async (req, res) => {
  const {food_Category_id} = req.params; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedDishCategory = await schemas.FoodCategory.findOne({food_Category_id:food_Category_id});

    if (!deletedDishCategory) {
      return res.status(404).json({ message: "Food category not found." });
    }
    await schemas.FoodCategory.deleteOne({ food_Category_id });


    res.status(200).json({ message: "Food category  deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteFoodCategoryById;
