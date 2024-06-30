const schemas = require("../../mongodb/schemas/schemas");

const GetDrinkById = async (req, res) => {
  const drink_id = req.params.drink_id;

  try {
    const drink = await schemas.Drink.findOne({drink_id:drink_id});

    if (!drink) {
      return res.status(404).json({ message: "Drink not found." });
    }

    res.status(200).json({ drink });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetDrinkById;

