const schemas = require("../../mongodb/schemas/schemas");

const updateDrink = async (req, res) => {
  const drink_id = req.params.drink_id;
  const updatedFields = req.body; // Assuming req.body contains the fields to be updated

  try {
    const updatedDrink = await schemas.Drink.findOneAndUpdate(
      { drink_id: drink_id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedDrink) {
      return res.status(404).json({ message: "Drink not found" });
    }

    res.status(200).json(updatedDrink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateDrink;
