const schemas = require("../../mongodb/schemas/schemas");

const updateBillById = async (req, res) => {
  try {
    const bills_id = req.params.bills_id;
    const updateFields = req.body;

    const updatedBill = await schemas.Bills.findOneAndUpdate(
      { bills_id:bills_id },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update bill" });
  }
};

module.exports = updateBillById;
