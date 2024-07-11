/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectDishItems,
  clearDishItems as DishClear,
  removeItemsByFoodIds,
} from "../store/slices/cartDishSlice";
import {
  selectDrinkItems,
  clearItems as DrinkClear,
  removeItemsByDrinkIds,
} from "../store/slices/cartDrinkSlice";
import { removeItemsByIds, resetCartItems, selectMenuSlice } from "./../store/slices/menuSlice";
import { MemberName, selectUserInfo } from "../store/slices/authSlice";
import {
  Orders,
  OrderDish,
  OrderDrink,
  ResponseDataOrders,
} from "./../apis/types";
import EmptyCart from "./EmptyCart";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./../src/components/ui/table";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import { TEST_URL } from "./../URL";
import DrinkCartCard from "./DrinkCartCard";
import DishCartCard from "./DishCartCard";
import { updateDishCache } from "./../apis/GET/fetchDishes";
import {updateDrinkCache} from "./../apis/GET/fetchDrinks"
import {updateDrinkCategoryCache} from "./../apis/GET/fetchDrinkCategory"
import {updateDishCategoryCache} from "./../apis/GET/fetchDishCategories"
const Cart = () => {
  const dishItems = useSelector(selectDishItems);
  const drinkItems = useSelector(selectDrinkItems);
  const { tableNo, user_id , otp} = useSelector(selectUserInfo);
  const {  member_name } = useSelector(MemberName)
  const [isLoading,setIsLoading]=useState(false);
  const menu=useSelector(selectMenuSlice)
  const dispatch = useDispatch();
  const qty=(id:string)=>{
    console.log(menu[id].quantity_bought)
    return menu[id].quantity_bought.toString();
  }
  const handleClick = () => {
    const orderDishes: OrderDish[] = dishItems.map((item) => ({
      foodName: item.foodName,
      food_id: item.food_id,
      quantity: qty(item.food_id),
      type:item.type
    }));

    const orderDrinks: OrderDrink[] = drinkItems.map((item) => ({
      drinkName: item.drinkName,
      quantity: qty(item.drink_id),
      drink_id: item.drink_id,
    }));

    const order: Orders = {
      tableNo: tableNo,
      user_id: user_id,
      member_name:member_name,
      otp:otp,
      drinks: orderDrinks.length > 0 ? orderDrinks : undefined,
      dishes: orderDishes.length > 0 ? orderDishes : undefined,
    };

    const updateFcache=async()=>{
       await updateDishCache();
       await updateDishCategoryCache();
    }

    const updateDcache=async()=>{
       await updateDrinkCache();
       await updateDrinkCategoryCache();
    }
    const placeOrder = async (data: Orders) => {
      try {
        setIsLoading(true)
        const response: AxiosResponse<ResponseDataOrders> = await axios.post(
          `${TEST_URL}/api/client/setOrders`,
          data
        );
        console.log(response)
        dispatch(DishClear());
        dispatch(DrinkClear());
        dispatch(resetCartItems());
      } catch (error:any) {
        console.log(error.response.status)
        if(error.response.status===403){
          toast.error(`${error.response.data.error}`,{
            autoClose:1500
          });
          console.log(error.response.data.invalidDishIds)
        }
        const invalidFids=error.response.data.invalidDishIds || [];
        const invalidDids=error.response.data.invalidDrinkIds || [];
        if(invalidFids){
          console.log(invalidFids)
          dispatch( removeItemsByFoodIds(invalidFids))
          dispatch(removeItemsByIds(invalidFids))
          updateFcache();
        }
        if(invalidDids){
          dispatch(removeItemsByDrinkIds(invalidDids))
          dispatch(removeItemsByIds(invalidDids))
          updateDcache();
        }
      }  finally{
        setIsLoading(false)
      }
    };
    // console.log(order)
    placeOrder(order);
  };

  return (
    <div className="w-full p-3 h-screen bg-gray-50">
      <ToastContainer
      toastClassName={() => 
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
      }
      
    />
      {dishItems.length !== 0 && (
        <>
          <div className="text-xl font-bold text-gray-800">Dishes</div>
          <Table className="my-4 bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Dish</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishItems.map((item) => {
                return (
                  <DishCartCard
                    key={item._id}
                    foodName={item.foodName}
                    foodPrice={item.foodPrice}
                    quantity_bought={item.quantity_bought}
                    food_id={item.food_id}
                    _id={""}
                    foodCategories={""}
                    food_category_id={""}
                    type={""}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
      {drinkItems.length !== 0 && (
        <>
          <div className="text-xl font-bold text-gray-800 mt-4">Drinks</div>
          <Table className="bg-white my-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Dish</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drinkItems.map((item) => {
                return (
                  <DrinkCartCard drinkName={item.drinkName} drinkNamePrice={item.drinkNamePrice} quantity_bought={item.quantity_bought}
                  food_id={item.drink_id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
      {dishItems.length === 0 && drinkItems.length === 0 ? (
        <div className="pt-2 sticky top-[52px] z-50">
          <EmptyCart />
        </div>
      ) : (
        <Button
        className="rounded-lg my-4 border-2 text-md bg-blue-600 font-semibold justify-center w-full"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Place order
      </Button>
      )}
      
    </div>
  );
};

export default Cart;
