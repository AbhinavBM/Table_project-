const schemas = require("../../mongodb/schemas/schemas");

const DeleteItemFromBill = async (req, res) => {
    try {
        const Orders_id = req.body.Orders_id;
        const drinkItems = req.body.drinks;
        const dishItems = req.body.dishes;

        if (!drinkItems.length && !dishItems.length) {
            return res.status(400).json({ message: "No items provided for deletion" });
        }

        const isValidFoodIds = await schemas.Food.find({ food_id: { $in: dishItems } }).countDocuments() === dishItems.length;
        const isValidDrinkIds = await schemas.Drink.find({ drink_id: { $in: drinkItems } }).countDocuments() === drinkItems.length;

        if (!isValidFoodIds || !isValidDrinkIds) {
            return res.status(400).json({ message: "Invalid food_id or drink_id provided" });
        }
        
        const updatedOrder = await schemas.Orders.findOneAndUpdate(
            { Orders_id: Orders_id },
            {
                $pull: {
                    dishes: { food_id: { $in: dishItems } },
                    drinks: { drink_id: { $in: drinkItems } }
                }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if both dishes and drinks arrays are empty, then delete the order
        if (updatedOrder.dishes.length === 0 && updatedOrder.drinks.length === 0) {
            await schemas.Orders.deleteOne({ Orders_id: Orders_id });
            return res.status(200).json({ message: "Order deleted successfully" });
        }
        
        return res.status(200).json({
            message: "Items deleted successfully",
            updatedOrder
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = DeleteItemFromBill;