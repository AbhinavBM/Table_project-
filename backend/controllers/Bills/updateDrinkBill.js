const schemas = require('../../mongodb/schemas/schemas');
updateDrinkBillStatus = async (req, res) => {
  try {
    const bills_id = req.params.bills_id; // Assuming the bill ID is passed as a parameter in the request URL
    const paid = req.body.drinkBillpaid;

    const updatedBills = await schemas.Bills.findOne({bills_id:bills_id})
    if (!updatedBills) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    updatedBills.drinkBillpaid = paid;
    await updatedBills.save();

    return res.json(updatedBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = updateDrinkBillStatus;
