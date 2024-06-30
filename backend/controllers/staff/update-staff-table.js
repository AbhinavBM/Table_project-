const schemas = require('../../mongodb/schemas/schemas');

updateTableNoAssigned = async (req, res) => {
  try {
    const staff_id = req.params.staff_id; // Assuming the food ID is passed as a parameter in the request URL
    const tableNoAssigned = req.body.tableNoAssigned;

    // Find the Staff by ID and update the tableNoAssigned
    const updatedStaff = await schemas.Staff.findOne({staff_id:staff_id})
    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    // Update the tableNoAssigned field in the staff document
    updatedStaff.tableNoAssigned = tableNoAssigned;
    await updatedStaff.save();

    return res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateTableNoAssigned;
