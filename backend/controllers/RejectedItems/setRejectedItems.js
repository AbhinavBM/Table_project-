const schemas = require("../../mongodb/schemas/schemas");

const SetRejected = async (req, res) => {
    try {
      const rejectedData = req.body;
      
    

      const rejected = new schemas.RejectedItems(rejectedData);
      const result = await rejected.save();
      console.log(result);
  
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports = SetRejected;
  