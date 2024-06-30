const schemas = require("../../mongodb/schemas/schemas");

const GetStaffBytableNo= async (req, res) => {
  const tableNoAssigned = req.params.tableNoAssigned; // Assuming the table bo is passed as a parameter in the request URL

  try {
    const staff = await schemas.Staff.find({tableNoAssigned:tableNoAssigned});

    if (!staff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    res.status(200).json({ staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetStaffBytableNo;

