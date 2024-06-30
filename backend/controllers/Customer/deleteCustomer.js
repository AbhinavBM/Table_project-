const schemas = require("../../mongodb/schemas/schemas");


const DeleteCustomerById = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const deletedDish = await schemas.User.findOne({user_id:user_id});

    if (!deletedDish) {
      return res.status(404).json({ message: "User not found." });
    }
    await schemas.User.deleteOne({user_id});


    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteCustomerById;
