const schemas = require("../../mongodb/schemas/schemas");

const GetBillById = async (req, res) => {
  const bills_id = req.params.bills_id; // Assuming the Bill ID is passed as a parameter in the request URL

  try {
    const bills = await schemas.Bills.findOne({bills_id:bills_id});

    if (!bills) {
      return res.status(404).json({ message: "Bills not found." });
    }

    res.status(200).json({ bills });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetBillById;

