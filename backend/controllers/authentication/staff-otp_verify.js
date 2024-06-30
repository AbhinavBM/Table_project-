const schemas = require("../../mongodb/schemas/schemas");

// API to get OTP by staff_id
const getOtpByStaffId = async (req, res) => {
  const staff_id = req.params.staff_id;

  try {
    const otpRecord = await schemas.OtpVerify.findOne({ staff_id });

    if (!otpRecord) {
      return res.status(404).json({ message: "OTP not found for the staff." });
    }

    res.status(200).json({ otpRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports  = getOtpByStaffId ;

