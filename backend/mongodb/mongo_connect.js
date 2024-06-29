const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
function ConnectToDb() {
  const url = process.env.MONGODB_URI
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });
  
}


module.exports = ConnectToDb;


