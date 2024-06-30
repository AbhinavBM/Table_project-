const schemas = require("../../mongodb/schemas/schemas");


const DeletedrinkManagerById = async (req, res) => {
  const {manager_id} = req.params; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedStaff = await schemas.DrinkManager.findOne({manager_id:manager_id});

    if (!deletedStaff) {
      return res.status(404).json({ message: "DrinkManager not found." });
    }
    await schemas.DrinkManager.deleteOne({manager_id})

    res.status(200).json({ message: "DrinkManager deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeletedrinkManagerById;
