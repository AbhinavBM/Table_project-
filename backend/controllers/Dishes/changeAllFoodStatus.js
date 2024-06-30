const schemas = require("../../mongodb/schemas/schemas");

const changeAllFoodStatus = async (req, res) => {
    const foodStatus = req.params.foodStatus; 

  try {
   const dishes =  await schemas.Food.updateMany({}, { $set: { foodStatus: foodStatus } });
    
    
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = changeAllFoodStatus;
