const schemas = require("../../mongodb/schemas/schemas");

const getAllMemberNames = async (req, res) => {
  try {
    const matchingMembers = await schemas.Members.find({ status: 'Active' });

    if (matchingMembers.length === 0) {
      return res.status(404).json({ success: false, message: "No active members found." });
    }

    const formattedMembers = matchingMembers.map(member => 
      `${member.name}-${member.membership_id}`
    );
    res.status(200).json({ members: formattedMembers });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getAllMemberNames;
