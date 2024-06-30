const schemas = require("../../mongodb/schemas/schemas");

const GetBillByTableNo = async (req, res) => {
  const tableNo = req.params.TableNo; // Assuming the Table Number is passed as a parameter in the request URL

  try {
    const bills = await schemas.Bills.find({ tableNo: tableNo, clear: "0" });

    if (!bills || bills.length === 0) {
      return res.status(404).json({ message: "Bills not found." });
    }

    res.status(200).json({ bills });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetBillByTableNo;
