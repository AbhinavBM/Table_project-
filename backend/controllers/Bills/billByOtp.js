const schemas = require("../../mongodb/schemas/schemas");

const GetBillByOtp= async (req, res) => {
  const otp = req.params.otp; // Assuming the Bill ID is passed as a parameter in the request URL

  try {
    const bills = await schemas.Bills.find({otp:otp});

    if (!bills) {
      return res.status(404).json({ message: "Bills not found." });
    }

    res.status(200).json({ bills });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = GetBillByOtp;
