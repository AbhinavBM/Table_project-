const schemas = require("../../mongodb/schemas/schemas");

const GetStaffById = async (req, res) => {
  const staff_id = req.params.staff_id; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const staff = await schemas.Staff.find({staff_id:staff_id});

    if (!staff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    res.status(200).json({ staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetStaffById;

