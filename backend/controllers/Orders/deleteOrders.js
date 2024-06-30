const schemas = require("../../mongodb/schemas/schemas");


const DeleteOrdersById = async (req, res) => {
  const {Orders_id} = req.params; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedOrders = await schemas.Orders.findOne({Orders_id:Orders_id});

    if (!deletedOrders) {
      return res.status(404).json({ message: "Orders not found." });
    }
    await schemas.Orders.deleteOne({Orders_id})

    res.status(200).json({ message: "Orders deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteOrdersById;
