/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {fetchDrinkCategory} from "../apis/GET/fetchDrinkCategory";
// import fetchDrinkByCategory from "../apis/GET/fetchDrinkByCategory";
import {fetchDrinks} from "../apis/GET/fetchDrinks"
// import fetchDrinkByKeyWord from "../apis/GET/fetchDrinksByKey"
import { DrinksCategory, DrinksGET } from "./../apis/types";
import DrinkCard from "./DrinkCard";
import { Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CallWaiterBtn from "./callWaiterBtn";
import SkelitonLoad from "./SkelitonLoad";
const DrinkCardContainer = () => {
  const [drinksArr, setDrinks] = useState<DrinksGET[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drinkCategory, setDrinkCategory] = useState<DrinksCategory[]>([]);
  const [selectedDrink, setSelectedDrink] = useState("");
  let filteredDrinks1;
  // const [filteredDrinks,setFilteredDrinks]=useState<DrinksGET[]>([])
  const getAllDrinks = async () => {
    try {
      setIsLoading(true);
      const drinks = await fetchDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getDrinkCategories = async () => {
    try {
      setIsLoading(true);
      const drinkCategory = await fetchDrinkCategory();

      // Sort the drink categories
      drinkCategory.sort((a, b) =>
        a.drinksCategory.localeCompare(b.drinksCategory)
      );

      // Update the state with the sorted and possibly modified drink categories
      setDrinkCategory([...drinkCategory]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDrinkCategories();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      getAllDrinks();
      setSelectedCategory(drinkCategory[0].drinksCategory)
    }
    console.log(drinkCategory);
  }, [drinkCategory]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
    // getDataByCategory(event.target.value);
  };

  filteredDrinks1=drinksArr.filter((drink) => {
    if(selectedDrink===""){
      const dishNameMatches = drink.drinkName
      .toLowerCase()
      .includes(selectedDrink.toLowerCase());
    const categoryMatches =
      selectedCategory === "All" || selectedCategory === drink.drinkCategories;
      const availible="0"===drink.drinkStatus;
    return dishNameMatches && categoryMatches && availible;
    }else{
      const drinkNameMatches = drink.drinkName
      .toLowerCase()
      .includes(selectedDrink.toLowerCase());
    return drinkNameMatches;
    }
    
  })
  // const do1=()=>{
  //   setFilteredDrinks( drinksArr.filter((drink) => {
  //     const dishNameMatches = drink.drinkName
  //       .toLowerCase()
  //       .includes(selectedDrink.toLowerCase());
  //     const categoryMatches =
  //       selectedCategory === "All" || selectedCategory === drink.drinkCategories;
  //     return dishNameMatches && categoryMatches;
  //   }))
  // }
 
 

  const handleChangeInput=async(search:string)=>{
    setSelectedDrink(search);
    // if(search==="") return

    // try{
    //   setIsLoading(true)
    //   const resp=await fetchDrinkByKeyWord(search);
    //   setFilteredDrinks(resp)
    // }catch(err){
    //   console.log(err)
    // }finally{
    //   setIsLoading(false)
    // }

  }

  return (
    <div className="w-full pb-4">
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
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search-dishes"
                          value={selectedDrink}
                          onChange={(e) => handleChangeInput(e.target.value)}
                          name="search-dishes"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm focus:shadow-none"
                          placeholder="Search for Drinks"
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
          <fieldset className="flex gap-2 mb-3">
            {drinkCategory.map((category, index) => (
              <div key={index} className="w-max">
                <input
                  type="radio"
                  name="CategoryOption"
                  value={category.drinksCategory}
                  id={`Category${index}`}
                  className="peer hidden"
                  checked={category.drinksCategory === selectedCategory}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={`Category${index}`}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white shadow-sm"
                >
                  <p className="text-sm font-medium capitalize">
                    {category.drinksCategory.toLowerCase()}
                  </p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className="flex flex-col gap-4 pb-10 bg-gray-50">
          {isLoading ? (
            <SkelitonLoad />
          ) : (
            filteredDrinks1.map((drink) => {
              return (
                <DrinkCard
                  key={drink._id}
                  _id={drink._id}
                  drinkCategories={drink.drinkCategories}
                  drinkName={drink.drinkName}
                  drinkNamePrice={drink.drinkNamePrice}
                  drinks_category_id={drink.drinks_category_id}
                  drink_id={drink.drink_id}
                  __v={drink.__v}
                  filenames={drink.filenames}
                  description={drink.description} drinkStatus={""}                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkCardContainer;
