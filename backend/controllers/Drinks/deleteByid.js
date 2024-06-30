const schemas = require("../../mongodb/schemas/schemas");


const DeleteDrinkById = async (req, res) => {
  const drink_id = req.params.drink_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedDrink = await schemas.Drink.findOne({drink_id:drink_id});

    if (!deletedDrink) {
      return res.status(404).json({ message: "Drink not found." });
    }
    await schemas.Drink.deleteOne({drink_id})

    res.status(200).json({ message: "Drink deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteDrinkById;
