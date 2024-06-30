const schemas = require("../../mongodb/schemas/schemas");


const DeleteMemberById = async (req, res) => {
  const membership_id = req.params.membership_id;

  try {
    const deletedDish = await schemas.Members.findOne({membership_id:membership_id});

    if (!deletedDish) {
      return res.status(404).json({ message: "Member not found." });
    }
    await schemas.Members.deleteOne({membership_id});


    res.status(200).json({ message: "Member deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteMemberById;
