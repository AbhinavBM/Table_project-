const schemas = require("../../mongodb/schemas/schemas");

const GetdrinkManagerById = async (req, res) => {
  const manager_id = req.params.manager_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const staff = await schemas.DrinkManager.find({manager_id:manager_id});

    if (!staff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    res.status(200).json({ staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetdrinkManagerById;

