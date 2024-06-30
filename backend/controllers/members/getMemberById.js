const express = require('express');
const schemas = require("../../mongodb/schemas/schemas");

getMemberByMembershipId= async (req, res) => {
  try {
    const membership_id = req.params.membership_id;
    
    const member = await schemas.Members.findOne({ membership_id }).exec();
    
    if (!member) {
      return res.status(404).json({ message: `Member with membership_id ${membership_id} not found.` });
    }

    res.status(200).json({ member });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getMemberByMembershipId;
