const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const os = require('os');
const tmpdir = os.tmpdir();

const upload = multer({ dest: tmpdir });

const { uploadFile, getFileStream } = require('../../s3');
const { Food } = require("../../mongodb/schemas/Food");

const UploadDishes = async (req, res) => {
  const file = req.file;

  try {
    let result;
    if (file) {
      result = await uploadFile(file);
    } else {
   
      result = {}; 
    }

    const dish = schemas.Food({
      filenames: result ? result.Location : null, 
      foodName: req.body.foodName,
      foodPrice: req.body.foodPrice,
      foodCategories: req.body.foodCategories,
      type: req.body.type,
      food_category_id: req.body.food_category_id,
      description: req.body.description,  
      tax:req.body.tax,
    });

    await dish.save();
    console.log("Saved to Dish collection.");
    return res.status(200).json({ message: "Successfully registered new Dish/Food Item" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = UploadDishes;
