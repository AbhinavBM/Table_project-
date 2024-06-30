const { FoodCategory } = require("../../mongodb/schemas/schemas");

const setFoodCategory = async (req, res) => {


  const FoodCategory1 = new FoodCategory({
    food_Category: req.body.food_Category,   
  });

  try {
    const result = await FoodCategory1.save();

    console.log(result);
    res.status(200).json({ message: "Successfully set Food Category!", result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setFoodCategory;