const schemas = require("../../mongodb/schemas/schemas");

const updateMemberById = async (req, res) => {
  try {
    const membership_id = req.params.membership_id;
    const updateFields = req.body; 

    const updatedMember = await schemas.Members.findOneAndUpdate(
        {membership_id:membership_id},
        { $set: updateFields },
        { new: true } 
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ member: updatedMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update member" });
  }
};

module.exports = updateMemberById;
