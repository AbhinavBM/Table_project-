const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const GetFilenameArray = (req) => {
  num_images = req.files.length;
  let filenames = new Array();
  if (num_images) {
    for (let i = 0; i < req.files.length; i++) {
      let filename = req.files[i].filename;
      filenames.push(filename);
    }
  }
  return filenames;
};

const GetFileUrls = (documents) => {
  
  for (let i = 0; i < documents.length; i++) {
    for (let j = 0; j < documents[i].num_files; j++) {
      documents[i].filenames[j] =
        process.env.BASE_FILE_URL + documents[i].filenames[j];
    }
  }
}
const ImageUtil = {GetFilenameArray,GetFileUrls};
module.exports = ImageUtil;