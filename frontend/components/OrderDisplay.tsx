import { GetOrderResponse } from "./../apis/types";
import OrderItem from "./OrderItem";
import { Badge } from "@/components/ui/badge";
import CustomBadge from "./Badge";
import Rejected from "./Rejected";

const OrderDisplay = ({ data }: { data: GetOrderResponse["data"] }) => {
  return (
    <div className="p-4 flex flex-col-reverse">
      {data.map((order, index) => (
        <div>
          <div
            key={index}
            className="mb-4 p-4 border rounded-lg shadow-md relative"
          >
            {order.order_active === "1" ? (
              <Badge
                className="border-red-600 text-red-600 my-1"
                variant={"outline"}
                key={index}
              >
                Rejected
              </Badge>
            ) : null}
            <div className="flex justify-between items-center mb-2">
              <div>
                {(order.orderStatus==="999") && (
                  <p className="text-sm text-red-600 w-[80%]">
                    Some items of this order were rejected tap on the icon to
                    view !
                  </p>
                )}
                <div className="my-3">
                  <p className="text-gray-800 font-semibold">
                    Date : {order.date1}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    Time : {order.time1}
                  </p>
                </div>
              </div>
            </div>
            {(order.orderStatus === "999" ) && (
              <div className="absolute right-4 top-4">
                <Rejected order_id={order.Orders_id} />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {order.drinks?.length !== 0 && (
                <div>
                  <div className="flex justify-between">
                    <p className="text-md font-semibold mb-2">Drinks</p>
                    <div className="text-sm text-gray-500 capitalize">
                      <CustomBadge statusCode={`${order.drinkOrderStatus}`} />
                    </div>
                  </div>
                  {order.drinks &&
                    order.drinks.map((drink) => (
                      <OrderItem
                        key={drink._id}
                        name={drink.drinkName}
                        quantity={drink.quantity}
                        active={drink.drink_item_active}
                      />
                    ))}
                </div>
              )}
              {order.dishes?.length !== 0 && (
                <div>
                  <div className="flex justify-between">
                    <p className="text-md font-semibold mb-2">Dishes</p>
                    <div className="text-sm text-gray-500 capitalize">
                      <CustomBadge statusCode={`${order.foodOrderStatus}`} />
                    </div>
                  </div>
                  {order.dishes !== undefined
                    ? order.dishes.map((dish) => (
                        <OrderItem
                          key={dish._id}
                          name={dish.foodName}
                          quantity={dish.quantity}
                          active={dish.dish_item_active}
                        />
                      ))
                    : "none"}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
