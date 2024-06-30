const express = require("express");
const schemas = require("../../mongodb/schemas/schemas");
const { GetAllConnectionsFromMongoDB, sendToAll } = require('../../server');

updateOrderById = async (req, res) => {
  const Orders_id = req.params.Orders_id;
  const { drinks, dishes } = req.body; // New drinks and dishes data

  try {
    const order = await schemas.Orders.findOne({ Orders_id: Orders_id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (drinks !== null && drinks !== undefined) {
      order.drinks = drinks;
    } else {
      order.drinkOrderStatus = "2"; 
    }
    
    if (dishes !== null && dishes !== undefined) {
      order.dishes = dishes;
    } else {
      order.foodOrderStatus = "2"; 
    }

    await order.save();

    res.json({ message: "Order updated successfully", updatedOrder: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updateOrderById;
