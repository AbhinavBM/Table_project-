const { User } = require("../../mongodb/schemas/schemas");
const { OtpVerify } = require("../../mongodb/schemas/schemas"); // Import the OtpVerify model
const { Bills } = require("../../mongodb/schemas/schemas"); // Import the  model


const setUser = async (req, res) => {
  const user = new User({
    phoneNo: req.body.phoneNo,
    name: req.body.name,
    tableNo: req.body.tableNo,
    member_name:req.body.member_name,
    member_phoneNo:req.body.member_phoneNo,
    membership_id:req.body.membership_id,
  });

  try {
    const result = await user.save();

    console.log(result);

    const user_id = result.user_id; 
    const tableNo  = result.tableNo
 
    const otpVerify = new OtpVerify({
      user_id: user_id, 
      tableNo:tableNo,
    });
    const result1 = await otpVerify.save(); 
    res.status(200).json({otp:result1.otp,user_id:result.user_id,tableNo:tableNo});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
module.exports = setUser;















