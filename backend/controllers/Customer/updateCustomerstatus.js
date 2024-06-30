const { User } = require("../../mongodb/schemas/schemas");

customerStatus = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userStatus = req.body.userStatus;

    // Find the Staff by ID and update the Orders_id
    const updatedUser = await User.findOne({user_id:user_id});

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    updatedUser.userStatus  = userStatus;
    await updatedUser.save();

  
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = customerStatus;
