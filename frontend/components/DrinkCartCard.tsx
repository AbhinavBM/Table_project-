import React from "react";
import { TableCell, TableRow } from "../src/components/ui/table";
import { decreaseQuantity, increaseQuantity, selectQuantity } from "./../store/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/slices/cartDrinkSlice";
interface DrinkData {
    drinkName: string;
    drinkNamePrice: string;
    quantity_bought: number;
    food_id:string;
}
const DrinkCartCard: React.FC<DrinkData> = ({
    drinkName,
    drinkNamePrice,
    food_id
}) => {
    const qty = useSelector((state) => selectQuantity(state,food_id));
    // const [quantity, setQuantity] = useState(qty);
    const amount = parseInt(drinkNamePrice) * qty;
    const dispatch=useDispatch();
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
                drink_id: food_id,
                quantity_bought: 0,
                _id: "",
                drinkName: "",
                drinkNamePrice: "",
                drinkCategories: "",
                drinks_category_id: "",
                __v: 0
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
      <TableCell className="font-medium">{drinkName}</TableCell>
      <TableCell>{drinkNamePrice}</TableCell>
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
      <TableCell className="text-right">
        {amount}
      </TableCell>
    </TableRow>
  );
};

export default DrinkCartCard;
