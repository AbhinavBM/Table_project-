/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./../src/components/ui/badge";
import { DrinksGET } from "./../apis/types"; // Make sure you import the Drinks type
import { addItem, decrementItem } from "../store/slices/cartDrinkSlice";
import {
  increaseQuantity,
  selectQuantity,
  decreaseQuantity,
} from "./../store/slices/menuSlice";
import altImage from "../src/assets/altimages/bottle_alt.jpg";

const DrinkCard: React.FC<DrinksGET> = ({
  drinkName,
  drinkNamePrice,
  drink_id,
  drinkCategories,
  filenames,
  drinks_category_id,
  description,
}) => {
  const qty = useSelector((state) => selectQuantity(state, drink_id));
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(
      addItem({
        _id: drink_id,
        drinkCategories: drinkCategories,
        drinkName: drinkName,
        drinkNamePrice: drinkNamePrice,
        drinks_category_id: drinks_category_id,
        drink_id: drink_id,
        quantity_bought: 1,
        __v: 0,
      })
    );
    dispatch(
      increaseQuantity({
        food_id: drink_id,
      })
    );
    setQuantity((prev: any) => prev + 1);
  };

  const decrement = () => {
    dispatch(
      decrementItem({
        _id: drink_id,
        drinkCategories: drinkCategories,
        drinkName: drinkName,
        drinkNamePrice: drinkNamePrice,
        drinks_category_id: drinks_category_id,
        drink_id: drink_id,
        quantity_bought: 1,
        __v: 0,
      })
    );
    dispatch(
      decreaseQuantity({
        food_id: drink_id,
      })
    );
    setQuantity((prev: any) => (prev - 1 > 0 ? prev - 1 : 0));
  };

  return (
    <div className="p-4 rounded-md grid grid-cols-6 bg-white shadow-md mx-3">
      <div className="col-span-3">
        <div className="flex items-center my-2">
          <Badge className="text-xs capitalize" variant={"outline"}>
            {drinkCategories}
          </Badge>
        </div>
        <h4 className="font-bold text-blue-950 capitalize">{drinkName}</h4>
        <h4 className="text-sm font-semibold"> &#8377; {drinkNamePrice}</h4>
        <p className="text-slate-500 text-xs pt-1">{description}</p>
      </div>
      <div className="col-span-3 flex flex-col items-center py-1 justify-center">
        <div>
          {filenames ? (
            <img
              src={filenames}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square shadow"
              alt="Drink"
            />
          ) : (
            <img
              src={altImage}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square shadow"
              alt="Drink Image"
            />
          )}
        </div>
        <div className="flex relative bottom-[0.8rem]">
          {quantity === 0 ? (
            <button
              className="h-[30px] w-[80px] bg-gray-50 text-addg font-bold cursor-pointer rounded-md shadow-md border border-gray-300"
              onClick={increment}
            >
              ADD
            </button>
          ) : (
            <div className="shadow-md flex rounded-md">
              <button
                className="h-[30px] w-[20px] bg-white text-addg cursor-pointer rounded-l-md font-bold text-right"
                onClick={decrement}
              >
                -
              </button>
              <p className="h-[30px] w-[40px] bg-white text-addg flex justify-center items-center font-extrabold">
                {quantity}
              </p>
              <button
                className="h-[30px] w-[20px] bg-white text-addg cursor-pointer rounded-r-md font-bold text-left"
                onClick={increment}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
