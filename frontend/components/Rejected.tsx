import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import fetchRejectedItems from "./../apis/GET/fetchRejectedItems";
import { AlertTriangle } from "lucide-react";

interface Dish {
  _id: string;
  foodName: string;
  food_id: string;
  quantity: string;
}

interface Drink {
  _id: string;
  drinkName: string;
  quantity: string;
  drink_id: string;
}

interface RejectedItem {
  _id: string;
  user_id: string;
  Orders_id: string;
  reason: string;
  drinks: Drink[];
  dishes: Dish[];
  rejectedItems_id: string;
  __v: number;
}

const RejectedItemComponent: React.FC<{ item: RejectedItem }> = ({ item }) => {
  const { dishes, drinks } = item;

  return (
    <DialogDescription>
      <div className="p-4 bg-white rounded-lg mx-auto text-start text-gray-900">
        {dishes.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold">
              <span className="text-red-600">Dishes:</span>
            </p>
            <ul className="list-disc ml-6">
              {dishes.map((dish) => (
                <li key={dish._id}>
                  {dish.quantity} x {dish.foodName}
                </li>
              ))}
            </ul>
          </div>
        )}
        {drinks.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold">
              <span className="text-red-600">Drinks:</span>
            </p>
            <ul className="list-disc ml-6">
              {drinks.map((drink) => (
                <li key={drink._id}>
                  {drink.quantity} x {drink.drinkName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DialogDescription>
  );
};

const Rejected = ({order_id}:{order_id:string}) => {
  const [rejectedItems, setRejectedItems] = useState<RejectedItem[]>([]);

  const getData = async () => {
    try {
      const resp = await fetchRejectedItems(order_id); // Assuming no parameters needed
      setRejectedItems(resp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <AlertTriangle className="text-red-600 inline-block mr-1" />
        </DialogTrigger>
        <DialogContent className="border-2 w-[80%] mx-auto rounded-md">
          <DialogHeader>
            <DialogTitle className="text-red-400">
              These Items were rejected !
            </DialogTitle>
            {rejectedItems.map((item, index) => (
              <RejectedItemComponent key={index} item={item} />
            ))}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rejected;
