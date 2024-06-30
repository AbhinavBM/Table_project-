const schemas = require("../../mongodb/schemas/schemas");

updateDrinkStatus=async (req, res) => {
  const drink_id = req.params.drink_id;
  const newStatus = req.body.drinkStatus;

  try {
    const updatedDrink = await schemas.Drink.findOneAndUpdate(
        { drink_id: drink_id },
        { $set: { drinkStatus: newStatus } },
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
 
module.exports = updateDrinkStatus;
