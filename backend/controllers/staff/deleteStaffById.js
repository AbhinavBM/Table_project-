const schemas = require("../../mongodb/schemas/schemas");


const DeleteStaffsById = async (req, res) => {
  const {staff_id} = req.params; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedStaff = await schemas.Staff.findOne({staff_id});

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found." });
    }
    await schemas.Staff.deleteOne({staff_id})

    res.status(200).json({ message: "Staff deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteStaffsById;
