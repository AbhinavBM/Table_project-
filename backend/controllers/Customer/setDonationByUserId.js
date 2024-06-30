const schemas = require('../../mongodb/schemas/schemas');
setDonationByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id; 
    const donationAmount = req.params.donationAmount;
    console.log(user_id);   
    console.log(donationAmount);    

    const updatedBills = await schemas.User.findOne({user_id:user_id})
    if (!updatedBills) {
      return res.status(404).json({ error: ' User not found' });
    }

    updatedBills.donationAmount = donationAmount;
    await updatedBills.save();
console.log(updatedBills);  
    return res.json(updatedBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error });
  }
};
module.exports = setDonationByUserId;
