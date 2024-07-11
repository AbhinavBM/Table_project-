/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Badge } from "./../src/components/ui/badge";
import { DishProps } from "../apis/types";
import { useDispatch } from "react-redux/es/exports";
import { addItem, decrementItem } from "../store/slices/cartDishSlice";
import {
  increaseQuantity,
  selectQuantity,
  decreaseQuantity,
} from "./../store/slices/menuSlice";
import { useSelector } from "react-redux/es/exports";
import altImage1 from "./../src/assets/altimages/dish_alt.png";
import React from "react";
const colorCode: any = {
  "0": "#42c244",
  "1": "#f52a1b",
  "2": "#a3572e",
};
const DishCard: React.FC<DishProps> = ({
  foodName,
  foodPrice,
  type,
  foodCategories,
  food_id,
  filenames,
  description,
}) => {
  const qty = useSelector((state) => selectQuantity(state, food_id));
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(
      addItem({
        _id: foodName,
        foodCategories: foodCategories,
        foodName: foodName,
        foodPrice: foodPrice,
        food_category_id: foodCategories,
        food_id: food_id,
        type: type,
        quantity_bought: 1,
        description: "",
      })
    );
    dispatch(
      increaseQuantity({
        food_id: food_id,
      })
    );
    setQuantity((prev: any) => prev + 1);
  };
  const decrement = () => {
    dispatch(
      decrementItem({
        _id: foodName,
        foodCategories: foodCategories,
        foodName: foodName,
        foodPrice: foodPrice,
        food_category_id: foodCategories,
        food_id: food_id,
        type: type,
        quantity_bought: 1,
        description: "",
      })
    );
    dispatch(
      decreaseQuantity({
        food_id: food_id,
      })
    );
    setQuantity((prev: any) => (prev - 1 > 0 ? prev - 1 : 0));
  };

  return (
    <div className="pl-3 py-3 sm:p-4 rounded-md grid grid-cols-6 bg-white shadow-md sm:mx-3 mx-1">
      <div className="col-span-3">
        <div className="flex gap-1 my-2 items-center">
          <span
            className="p-1 border-[1.2px] mr-1 rounded-sm flex justify-center items-center"
            style={{
              maxHeight: "1.2rem",
              maxWidth: "1.2rem",
              borderColor: colorCode[type],
              color: colorCode[type],
            }}
          >
            <span
              className="p-[0.28rem] rounded-full"
              style={{ backgroundColor: colorCode[type] }}
            ></span>
          </span>
          <Badge className="text-xs w-max uppercase text-center" variant={"outline"}>
            {foodCategories.toLowerCase()}
          </Badge>
        </div>

        <h4 className="font-bold text-blue-950 capitalize">{foodName}</h4>
        <h4 className="text-sm font-semibold"> &#8377; {foodPrice}</h4>
        <p className="text-slate-500 text-xs">{description}</p>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center py-1 pl-4">
        <div>
          {filenames ? (
            <img
              src={filenames}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square shadow"
              alt="Dish"
            />
          ) : (
            <img
              src={altImage1}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square shadow"
              alt="Dish Image"
            />
          )}
        </div>
        <div className="flex relative bottom-[0.8rem]">
          {quantity === 0 ? (
            <button
              className="h-[30px] w-[80px] bg-gray-50 text-addg font-bold cursor-pointer rounded-md shadow-md border border-gray-300 relative"
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
export default DishCard;
