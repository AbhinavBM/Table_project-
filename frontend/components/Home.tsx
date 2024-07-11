import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import DrinkCardContainer from "./DrinkCardContainer";
import DishCardContainer from "./DishCardContainer";
import Cart from "./Cart";
import MyOrders from "./myOrders";
import { memo } from "react";
import { DishCartNo } from "./../store/slices/cartDishSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { DrinkCartNo } from "../store/slices/cartDrinkSlice";

const Home = () => {
  const tDish = useSelector(DishCartNo);
  const tDrink = useSelector(DrinkCartNo);
  return (
    <div className="min-h-screen max-w-xl mx-auto flex">
      <Tabs defaultValue="dishes" className="w-full">
        <div className="sticky top-0 bg-white z-50 pb-1">
          <TabsList className="w-full gap-2 flex justify-evenly">
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="cart" className="relative">
              Cart
              {(tDish !== 0 || tDrink !== 0) && (
                <span className="absolute top-[-0.3rem] right-[-0.5rem] bg-red-500 w-[1.2rem] h-[1.2rem] text-white rounded-full text-xs flex items-center justify-center font-semibold">
                  <p>{tDish + tDrink}</p>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="myorders">My Orders</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="dishes">
          <DishCardContainer />
        </TabsContent>
        <TabsContent value="drinks">
          <DrinkCardContainer />
        </TabsContent>
        <TabsContent value="cart">
          <Cart />
        </TabsContent>
        <TabsContent value="myorders">
          <MyOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default memo(Home);
