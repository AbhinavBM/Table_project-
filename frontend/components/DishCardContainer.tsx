/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "./../apis/types";
import {fetchDishCategories} from "../apis/GET/fetchDishCategories";
// import fetchDishesByCategory from "../apis/GET/fetchDishByCategories";
import {fetchDishes} from "../apis/GET/fetchDishes"
import { Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CallWaiterBtn from "./callWaiterBtn";
import SkelitonLoad from "./SkelitonLoad";
import { FoodCategory } from "./../apis/types";
import TypeBadge from "./TypeBadge";
import { ToastContainer } from "react-toastify";

const types = ["0", "1", "2"];

const DishCardContainer: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState("");
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [filteredDishes,setFilteredDishes]=useState<Dish[]>([])
  let filteredDishes1:Dish[]=[]
  const [selectedTypes, setSelectedTypes] = useState<any>({
    "0": "0",
    "1": "0",
    "2": "0",
  });

  useEffect(() => {
    setSelectedTypes({
      "0": "0",
      "1": "0",
      "2": "0",
    });
  }, []);

  const handleTypeClick = (type: any) => {
    setSelectedTypes((prev: any) => {
      return {
        ...prev,
        [type]: prev[type] == "0" ? "1" : "0",
      };
    });
  };

  const getAllDishes = async () => {
    try {
      setIsLoading(true);
      const dishArr = await fetchDishes();
      dishArr.sort((a, b) => a.foodCategories.localeCompare(b.foodCategories));
      setDishes(dishArr);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCategoryChange = (event: any) => {
    setSelectedCategory(()=>{
      return event.target.value;
    });
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const CategoryArr = await fetchDishCategories();
      CategoryArr.sort(
        (a: { food_Category: string }, b: { food_Category: any }) =>
          a.food_Category.localeCompare(b.food_Category)
      );
      setCategories([...CategoryArr]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].food_Category);
    }
  }, [categories]);

  useEffect(() => {
    getCategories();
    if (categories.length > 0) {
      setSelectedCategory(categories[0].food_Category);
      getAllDishes();
    }
  }, []);

  const customFunc = (type: string) => {
    if (
      selectedTypes["0"] === "0" &&
      selectedTypes["1"] === "0" &&
      selectedTypes["2"] === "0"
    )
      return true;
    return selectedTypes[type] === "1";
  };

  // var filteredDishes: Dish[] =[];
  // const do1=()=>{
  //   setFilteredDishes(dishes.filter((dish) => {
  //     const typeMatches = customFunc(dish.type);
  //     const categoryMatches =
  //       selectedCategory === "All" || selectedCategory === dish.foodCategories;
  //     return typeMatches && categoryMatches;
  //   }))
  // }

  filteredDishes1=dishes.filter((dish) => {
    if(selectedDish===""){
      const typeMatches = customFunc(dish.type);
    const categoryMatches =
      selectedCategory === "All" || selectedCategory === dish.foodCategories;
     const availible= dish.foodStatus ==="0";
    return typeMatches && categoryMatches && availible;
    }else{
      const dishNameMatches=dish.foodName.toLowerCase().includes(selectedDish.toLowerCase());
      return dishNameMatches;
    }
  })

  // useEffect(()=>{
  //   //  do1();
  // },[dishes])

  // useEffect(()=>{
  //   console.log("filtered",filteredDishes);
  // },[filteredDishes])

  
  useEffect(()=>{
    getAllDishes();
  },[])

  const clearFilter = () => {
    setSelectedDish("");
    if (!isLoading) {
      setSelectedCategory(categories[0].food_Category);
    }
    setSelectedTypes({
      "0": "0",
      "1": "0",
      "2": "0",
    });
  };

  const dishWithCategoryTitles: Record<string, Dish[]> = dishes.reduce(
    (accumulator: any, dish: Dish) => {
      const category = dish.foodCategories;
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      (accumulator[category] as Dish[]).push(dish);
      return accumulator;
    },
    {}
  );

  const handleChange=(search:string)=>{
    setSelectedDish(search)
  }

  const dishElements = [];
  for (const [category, dishesInCategory] of Object.entries(
    dishWithCategoryTitles
  )) {
    dishElements.push(
      <div key={category}>
        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
          {category}
        </h2>
        {dishesInCategory.map((dish) => (
          <div key={dish._id}>
            <DishCard
              key={dish._id}
              foodName={dish.foodName}
              foodPrice={dish.foodPrice}
              foodCategories={dish.foodCategories}
              type={dish.type}
              food_category_id={dish.food_category_id}
              filenames={dish.filenames}
              food_id={dish.food_id}
              description={dish.description}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full pb-4">
      <ToastContainer
        toastClassName={() =>
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
        }
      />
      <div className="flex flex-col gap-4 bg-gray-50">
        <Disclosure
          as="nav"
          className="bg-white sticky top-[52px] z-50 shadow-nav"
        >
          {({ open }) => (
            <>
              <div className="mx-1 max-w-7xl pr-2 sm:px-4">
                <div className="flex h-14 justify-end w-full">
                  <div className="flex items-center px-2 w-full">
                    <div className="w-full">
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search-dishes"
                          value={selectedDish}
                          onChange={(e) => handleChange(e.target.value)}
                          name="search-dishes"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm focus:shadow-none"
                          placeholder="Search for dishes..."
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Transition
                enter="transition duration-150 ease-out transform"
                enterFrom="opacity-0 translate-y-[-20px]"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-100 ease-in transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[-20px]"
              >
                <Disclosure.Panel className="" static>
                  <div className="space-y-1 pt-2 pb-3">
                    <Disclosure.Button
                      as="a"
                      href="/app"
                      className="block border-l-4 border-blue-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700"
                    >
                      Home
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      <CallWaiterBtn />
                    </Disclosure.Button>
                  
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <div className="w-full overflow-x-auto px-2">
          <fieldset className="flex gap-2">
            {categories.map((category, index) => (
              <div key={index} className="mb-3 w-max">
                <input
                  type="radio"
                  name="CategoryOption"
                  value={category.food_Category}
                  id={`Category${index}`}
                  className="peer hidden"
                  checked={category.food_Category === selectedCategory}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={`Category${index}`}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white shadow-sm"
                >
                  <p className="text-sm font-medium capitalize">
                    {category.food_Category.toLowerCase()}
                  </p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className="px-2">
          {types.map((typeCode, index) => {
            return (
              <TypeBadge
                key={index}
                statusCode={typeCode}
                onClick={handleTypeClick}
                selected={selectedTypes[typeCode] === "1"}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 pb-10 bg-gray-50">
          {isLoading ? (
            <div>
              <SkelitonLoad />
            </div>
          ) : filteredDishes1.length > 0 ? (
            filteredDishes1.map((dish) => (
              <div key={dish._id}>
                <DishCard
                  key={dish._id}
                  foodName={dish.foodName}
                  foodPrice={dish.foodPrice}
                  foodCategories={dish.foodCategories}
                  type={dish.type}
                  food_category_id={dish.food_category_id}
                  filenames={dish.filenames}
                  food_id={dish.food_id}
                  description={dish.description}
                />
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No items found in this filter.</p>
              <button
                onClick={clearFilter}
                className="bg-gray-300 rounded px-2 py-1 mx-auto hover:bg-slate-200 mt-1"
              >
                Clear
              </button>
              {selectedDish !== "" && (
                <div className="mt-2">
                  <button
                    onClick={() => setSelectedDish("")}
                    className="bg-gray-300 rounded px-2 py-1 mx-auto hover:bg-slate-200"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCardContainer;
