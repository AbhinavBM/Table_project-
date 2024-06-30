
const schemas = require('../../mongodb/schemas/schemas');

 totalExpenditure= async (req, res) => {
  try {
    const membershipId = req.params.membership_id;

    const bills = await schemas.Bills.find({ membership_id: membershipId });

    const totalExpenditure = bills.reduce(
      (total, bill) => total + parseFloat(bill.grandTotal),
      0
    );

    res.json({
      membership_id: membershipId,
      total_expenditure: totalExpenditure.toFixed(2), 
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data." });
  }
};

module.exports = totalExpenditure;
