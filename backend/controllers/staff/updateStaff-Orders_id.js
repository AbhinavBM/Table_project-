const { Staff } = require("../../mongodb/schemas/Food");

StaffupdateOrdersId = async (req, res) => {
  try {
    const staff_id = req.params.staff_id;
    const Orders_id = req.body.Orders_id;

    // Find the Staff by ID and update the Orders_id
    const updatedStaff = await Staff.findOne({staff_id:staff_id});

    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    updatedStaff.Orders_id  = Orders_id;
    await updatedStaff.save();


    return res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = StaffupdateOrdersId;
