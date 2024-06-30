const schemas = require('../../mongodb/schemas/schemas');
setDonation = async (req, res) => {
  try {
    const bills_id = req.params.bills_id; 
    const donationAmount = req.body.donationAmount;

    const updatedBills = await schemas.Bills.findOne({bills_id:bills_id})
    if (!updatedBills) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    updatedBills.donationAmount = donationAmount;
    await updatedBills.save();

    return res.json(updatedBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = setDonation;
