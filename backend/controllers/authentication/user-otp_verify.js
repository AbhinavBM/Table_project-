const schemas = require("../../mongodb/schemas/schemas");

const getOtpByUserId = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const otpRecord = await schemas.OtpVerify.findOne({ user_id });

    if (!otpRecord) {
      return res.status(404).json({ message: "OTP not found for the user." });
    }

    res.status(200).json({ otpRecord});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// API to get OTP by staff_id


module.exports = getOtpByUserId ;








