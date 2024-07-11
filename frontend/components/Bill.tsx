import React from "react";
import { ResponseDataOrders } from "./../apis/types";
import { Drink, Dish } from "../apis/types";
const Bill: React.FC<ResponseDataOrders> = ({
  Orders_id,
  orderStatus,
  time1,
  date1,
  drinks,
  dishes,
}) => {
  return (
    <div className="bg-white p-4 border border-gray-900 rounded-lg m-2">
      <div className="font-semibold mb-2">Order ID: {Orders_id}</div>
      <div>Status: {orderStatus}</div>
      <div>Time: {time1}</div>
      <div>Date: {date1}</div>
      <div className="bg-white rounded-sm mt-4">
        {dishes.map((dish: Dish) => (
          <div className="flex justify-between p-3 border border-gray-800 mb-2">
            <div className="font-medium">Dish: {dish.foodName}</div>
            <div>Qty: {dish.quantity}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-sm mt-4">
        {drinks.length === 0 ? (
          <div className="p-3 text-gray-600">No drinks in this order</div>
        ) : (
          drinks.map((drink: Drink) => (
            <div className="flex justify-between p-3 border border-gray-800 mb-2">
              <div className="font-medium">Drink: {drink.drinkName}</div>
              <div>Qty: {drink.quantity}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bill;
