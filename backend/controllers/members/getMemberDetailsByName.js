const schemas = require("../../mongodb/schemas/schemas");

const getMemberDetailsByName = async (req, res) => {
  const memberName = req.body.name;
  const membershipId = req.body.membership_id;

  try {
    const matchingMembers = await schemas.Members.find({ name: memberName, membership_id: membershipId, status: 'Active' });

    if (matchingMembers.length === 0) {
      return res.status(404).json({ success: false, message: "Active member not found with the given name and membership ID." });
    }

    res.status(200).json({ success: true, data: matchingMembers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getMemberDetailsByName;
