const schemas = require("../../mongodb/schemas/schemas");

const changeItemStatus = async (req, res) => {
  const Orders_id = req.body.Orders_id;
  const query = req.body.query;
  let itemId;
  let itemKey;
  const active = req.body.active;
  const reason = req.body.reason;

  if (query === "0") {
    itemId = req.body.food_id;
    itemKey = 'dishes';
  } else {
    itemId = req.body.drink_id;
    itemKey = 'drinks';
  }

  const updateObj = {};
  updateObj[`${itemKey}.$[item].${itemKey}_item_active`] = active;

  const arrayFilters = [
    {
      "item.food_id": itemId,
    },
  ];

  try {
    const updatedOrder = await schemas.Orders.findOneAndUpdate(
      { Orders_id: Orders_id },
      { $set: updateObj },
      { 
        arrayFilters: arrayFilters,
        new: true, // Return the updated document
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (active === "1") {
      const reject = new schemas.RejectedItems({
        Orders_id: Orders_id,
        reason: reason,
        item_id: itemId,
        user_id: updatedOrder.user_id,
        type: itemKey === "dishes" ? "0" : "1",
      });
      await reject.save();
      console.log("Reject object saved:", reject);
    }

    res.status(200).json({ message: "Item status updated successfully.", updatedOrder: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = changeItemStatus;
