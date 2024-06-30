const schemas = require("../../mongodb/schemas/schemas");

const getMemberByPhoneNO = async (req, res) => {
  const phoneNo = req.params.phoneNo;

  try {
    console.log({ phoneNo: phoneNo })
    const matchingMembers = await schemas.Members.find({ phoneNo: phoneNo, status: 'Active' });

    if (matchingMembers.length === 0) {
      return res.status(404).json({ success: false, message: "No active members found for the given phoneNo." });
    }

    res.status(200).json({ success: true, data: matchingMembers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getMemberByPhoneNO;
