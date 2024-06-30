const schemas = require("../../mongodb/schemas/schemas");

const getAllMembers = async (req, res) => {
  try {
    const members = await schemas.Members.find({});

    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};

module.exports = getAllMembers;
