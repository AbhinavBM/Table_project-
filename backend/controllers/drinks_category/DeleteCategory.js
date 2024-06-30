const schemas = require("../../mongodb/schemas/schemas");


const DeleteDrinkCategoryById = async (req, res) => {
  const drinks_Category_id = req.params.drinks_Category_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedDrinkCategory = await schemas.DrinksCategory.findOne({drinks_Category_id:drinks_Category_id});

    if (!deletedDrinkCategory) {
      return res.status(404).json({ message: "Drink category not found." });
    }
    await schemas.DrinksCategory.deleteOne({ drinks_Category_id });


    res.status(200).json({ message: "Drink category  deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteDrinkCategoryById;
