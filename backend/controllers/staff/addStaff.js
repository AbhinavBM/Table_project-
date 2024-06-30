const { Staff } = require("../../mongodb/schemas/schemas");
//add tables
const schemas = require("../../mongodb/schemas/schemas");

const setStaff = async (req, res) => {

  const staff = new schemas.Staff({
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,  
    whichWaiter:req.body.whichWaiter

  });

  try {
    const result = await staff.save();

    console.log(result);
    res.status(200).json({ result});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setStaff;