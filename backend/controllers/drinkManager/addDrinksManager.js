
const schemas = require("../../mongodb/schemas/schemas");

const setDrinkManager = async (req, res) => {

  const drinkManager = new schemas.DrinkManager({
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,  
  });

  try {
    const result = await drinkManager.save();

    console.log(result);
    res.status(200).json({ result});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setDrinkManager;