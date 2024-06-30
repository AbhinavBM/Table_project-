const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config({ path: "./.env" });


const storage = new GridFsStorage({
    url : process.env.MONGODB_URI,
    file : (req,file) => {
        return new Promise((resolve,reject) => {
            crypto.randomBytes(16,(err,buff) => {
                if(err){
                    return reject(err);
                }
                const filename = buff.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename : filename,
                    bucketName : "storage"
                };
                resolve(fileInfo);
            });
        });
    }

});

const file_upload = multer({storage : storage});

module.exports = file_upload;