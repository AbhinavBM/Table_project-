const schemas = require("../../mongodb/schemas/schemas");

const setDrinksCategory = async (req, res) => {


  const Drinkscategory = new schemas.DrinksCategory({
    drinksCategory: req.body.drinksCategory,   
  });

  try {
    const result = await Drinkscategory.save();

    console.log(result);
    res.status(200).json({ message: "Successfully set Drinks Category!", result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setDrinksCategory;