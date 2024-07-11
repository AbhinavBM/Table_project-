import React from "react";

interface OrderItemProps {
  name: string;
  quantity: string;
  active: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, quantity, active }) => {
  return (
    <div
      className="flex items-center py-2 border-b border-gray-300"
      style={active === "1" ? { textDecorationLine: "line-through" } : {}}
    >
      <div className="flex-1">
        <p className="text-sm">{name}</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-600">{quantity}x</p>
      </div>
    </div>
  );
};

export default OrderItem;
