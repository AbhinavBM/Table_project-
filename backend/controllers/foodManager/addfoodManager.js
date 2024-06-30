
const schemas = require("../../mongodb/schemas/schemas");

const setFoodManager = async (req, res) => {

  const foodManager = new schemas.FoodManager({
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,  
  });

  try {
    const result = await foodManager.save();

    console.log(result);
    res.status(200).json({ result});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setFoodManager;