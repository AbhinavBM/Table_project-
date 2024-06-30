const schemas = require('../../mongodb/schemas/schemas');
updateFoodBillStatus = async (req, res) => {
  try {
    const bills_id = req.params.bills_id; // Assuming the bill ID is passed as a parameter in the request URL
    const paid = req.body.foodBillpaid;

    // Find the Staff by ID and update the tableNoAssigned
    const updatedBills = await schemas.Bills.findOne({bills_id:bills_id})
    if (!updatedBills) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // Update the tableNoAssigned field in the staff document
    updatedBills.foodBillpaid = paid;
    await updatedBills.save();

    return res.json(updatedBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = updateFoodBillStatus;
