const schemas = require("../../mongodb/schemas/schemas");

const UserByOtp = async (req, res) => {
  try {
    const otp = req.params.otp;
    const tableNo = req.params.tableNo; // Get tableNo from req.body

    const user = await schemas.OtpVerify.findOne({ otp });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (tableNo !== user.tableNo) {
      return res.status(400).json({ message: 'Table number does not match' });
    }
  
      // If userId matches, search in the user schema and return the user data
      const userData = await schemas.User.findOne({ user_id: user.user_id });
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' });
      }
  
      return res.status(200).json(userData);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = UserByOtp;
