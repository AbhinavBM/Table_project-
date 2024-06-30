const schemas = require("../../mongodb/schemas/schemas");


const DeleteBillById = async (req, res) => {
  const {otp} = req.params; // Assuming the food ID is passed as a parameter in the request URL

  try {
    const deletedBill = await schemas.Bills.findOne({otp});

    if (!deletedBill) {
      return res.status(404).json({ message: "Bills not found." });
    }
    await schemas.Bills.deleteOne({otp})

    res.status(200).json({ message: "Bill deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  DeleteBillById;