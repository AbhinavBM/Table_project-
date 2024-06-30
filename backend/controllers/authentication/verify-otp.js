const schemas = require("../../mongodb/schemas/schemas");

const verifyOtp = async (req, res) => {
  const user_id = req.body.user_id;
  const userEnteredOtp = req.body.otp; 

  try {
    const otpRecord = await schemas.OtpVerify.findOne({ user_id });

    if (!otpRecord) {
      return res.status(404).json({ message: "OTP not found for the user." });
    }

    if (otpRecord.otp !== userEnteredOtp) {
      return res.status(400).json({ message: "Entered OTP does not match." });
    }

    res.status(200).json({ message: "OTP verification successful." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while verifying OTP." });
  }
};

module.exports = verifyOtp;
