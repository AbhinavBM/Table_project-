const schemas = require("../../mongodb/schemas/schemas");
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const os = require('os');
const tmpdir = os.tmpdir();

const upload = multer({ dest: tmpdir });


const { uploadFile, getFileStream } = require('../../s3');

const UploadDrinks = async (req, res) => {
  const file = req.file;

  try {
  
      let result;
      if (file) {
        // If a file is provided, upload the file to S3.
        result = await uploadFile(file);
      } else {
        // If no file is provided, you can decide what to do here.
        // For example, you can set 'result' to an empty object or null.
        result = {}; 
      }// or result = null;
      
      // If a file is provided, upload the file to S3.

      const drinks = schemas.Drink({
        filenames: result ? result.Location : null, // Use null if file was not provided.
        drinkName: req.body.drinkName,
        drinkNamePrice: req.body.drinkNamePrice,
        drinks_category_id: req.body.drinks_category_id,
        drinkCategories: req.body.drinkCategories,
        description: req.body.description,  
        tax:req.body.tax,
      });

      await drinks.save();
      console.log("Saved to drink collection.");
      return res.status(200).json({ message: "Successfully registered new Drink Item" });
    }
   catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = UploadDrinks;
