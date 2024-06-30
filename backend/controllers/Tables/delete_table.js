const { Table } = require("../../mongodb/schemas/schemas");

const deleteTable = async (req, res) => {
    const { tableNo } = req.params;
  
    try {
      // Find the record to be deleted by its unique tableNo
      const table = await Table.findOne({ tableNo });
  
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
  
      // Perform the delete operation
      await Table.deleteOne({ tableNo });
  
      return res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete table' });
    }
  };
  
  module.exports = deleteTable ;

  
  // Register the getTables API route
  
  // Register the deleteTable API route
  

  
  
  
  