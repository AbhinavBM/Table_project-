import React from "react";
import { CartItem } from "../apis/types";
import { TableCell, TableRow } from "../src/components/ui/table";
import { useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, selectQuantity } from "../store/slices/menuSlice";
import { useDispatch } from "react-redux";
import {  removeItem } from "./../store/slices/cartDishSlice";

const CartCard: React.FC<CartItem> = ({
  foodName,
  foodPrice,
  food_id
}) => {
  const qty = useSelector((state) => selectQuantity(state, food_id));
  // const [quantity, setQuantity] = useState(qty);
  const dispatch=useDispatch();
  const amount = parseInt(foodPrice) * qty;
  const increment=()=>{
    dispatch(
      increaseQuantity({
        food_id: food_id,
      })
    );
  }
  const decrement=()=>{
    if(qty===1){
      dispatch(
        removeItem({
          food_id: food_id,
          quantity_bought: 0,
          _id: "",
          foodName: "",
          foodPrice: "",
          foodCategories: "",
          food_category_id: "",
          description: "",
          type: ""
        })
      )
      dispatch(
        decreaseQuantity({
          food_id: food_id,
        })
      );
    }else{
      dispatch(
        decreaseQuantity({
          food_id: food_id,
        })
      );
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{foodName}</TableCell>
      <TableCell>{foodPrice}</TableCell>
      <TableCell className="text-center justify-around">
      <div className="flex rounded-md justify-center">
              <button
                className="h-[30px] w-[20px] bg-white text-gray-800 cursor-pointer rounded-l-md font-bold text-right"
                onClick={decrement}
              >
                -
              </button>
              <p className="h-[30px] w-[40px] bg-white text-gray-800 flex justify-center items-center font-extrabold">
                {qty}
              </p>
              <button
                className="h-[30px] w-[20px] bg-white text-gray-800 cursor-pointer rounded-r-md font-bold text-left"
                onClick={increment}
              >
                +
              </button>
            </div>
      </TableCell>
      <TableCell className="text-right">{amount}</TableCell>
    </TableRow>
  );
};

export default CartCard;
