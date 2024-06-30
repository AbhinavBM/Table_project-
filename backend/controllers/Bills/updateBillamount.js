const schemas = require('../../mongodb/schemas/schemas');

updateBillAmount = async (req, res) => {
  try {
    const bill_id = req.params.bill_id; 
    const grandTotal = req.body.grandTotal;
    const dishTotal = req.body.dishTotal;
    const drinkTotal = req.body.drinkTotal;


    // Find the Staff by ID and update the tableNoAssigned
    const updatedBills = await schemas.Bills.findOne({bill_id:bill_id})
    if (!updatedBills) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // Update the tableNoAssigned field in the staff document
    updatedBills.grandTotal = grandTotal;
    updatedBills.dishTotal = dishTotal;
    updatedBills.drinkTotal = drinkTotal;

    await updatedBills.save();

    return res.json(updatedBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = updateBillAmount;
