const schemas = require("../../mongodb/schemas/schemas");

const changeAllDrinkStatus = async (req, res) => {
    const drinkStatus = req.params.drinkStatus; 

  try {
   const drinks =  await schemas.Drink.updateMany({}, { $set: { drinkStatus: drinkStatus } });
    res.status(200).json({ drinks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = changeAllDrinkStatus;
