const express = require('express');
const router = express.Router();
const schemas = require("../../mongodb/schemas/schemas");

getAllMembersFormatted = async (req, res) => {
  try {
    const members = await schemas.Members.find({ status: 'Active'}, 'name membership_id phone_no id status').exec();
    
    const formattedMembers = members.map(member => ({
      rahil: member.name + " - " + member.membership_id,
      name: member.name,
      membership_id: member.membership_id,
      phone_no: member.phone_no,
      id: member.id,
      status: member.status
    }));

    res.status(200).json({ members: formattedMembers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getAllMembersFormatted;
