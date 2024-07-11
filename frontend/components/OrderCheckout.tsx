/* eslint-disable @typescript-eslint/no-explicit-any */
import EmblaCarousel from "./EmbalaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import { Fragment, useEffect, useRef, useState } from "react";
import "./../src/embala.css";

import { Dialog, Transition } from "@headlessui/react";
import setDonationAmt from "../apis/GET/setDonation";
import fetchBillByOtp from "./../apis/GET/fetchBillByOtp";
import { BillDetails } from "apis/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHasDonatedInfo,
  selectUserInfo,
  setHasDonated,
} from "./../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";
// import { Badge } from "@/components/ui/badge";
const OPTIONS: EmblaOptionsType = { direction: "ltr" };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

interface TableRowProps {
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface TableFooterRowProps {
  title: string;
  amount: number;
  isBold?: boolean;
}
function TableRow({ name, price, quantity, amount }: TableRowProps) {
  return (
    <tr className="border-b border-slate-200">
      <td className="py-4 px-3 text-sm">
        <div className="font-medium text-slate-700">{name}</div>
      </td>
      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500">
        &#8377; {price}
      </td>
      <td className="py-3 px-2 text-sm text-center text-slate-500">
        X {quantity}
      </td>
      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500">
        &#8377; {amount}
      </td>
    </tr>
  );
}

function TableFooterRow({ title, amount, isBold }: TableFooterRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className={`pt-4 pl-4 pr-3 text-sm ${
          isBold ? "font-semibold" : "font-light"
        } text-left text-slate-500`}
      >
        {title}
      </th>
      <td
        className={`pt-4 pl-3 pr-4 text-sm text-right text-slate-500 ${
          isBold ? "font-semibold" : "font-light"
        } `}
      >
        &#8377; {amount.toFixed(2)}
      </td>
    </tr>
  );
}

// function TableFooterRow_1({ title, amount, isBold }: TableFooterRowProps) {
//   return (
//     <tr>
//       <th
//         scope="row"
//         className={`pt-4 pl-4 pr-3 text-sm ${
//           isBold ? "font-semibold" : "font-light"
//         } text-left text-slate-500`}
//       >
//         {title}
//       </th>
//       <td
//         className={`pt-4 pl-3 pr-4 text-sm text-right text-slate-500 ${
//           isBold ? "font-semibold" : "font-light"
//         } `}
//       >
//         % {amount.toFixed(2)}
//       </td>
//     </tr>
//   );
// }

const Ordercheckout = ({ type }: { type: string }) => {
  const navigate = useNavigate();

  const { otp, user_id } = useSelector(selectUserInfo);
  const donated = useSelector(selectHasDonatedInfo);
  const [open, setOpen] = useState(!donated);

  const [billDetails, setBillDetailes] = useState<BillDetails>();
  const [donationAmount, setDonationAmount] = useState("0");
  const dispatch = useDispatch();
  const fetchBill = async () => {
    try {
      const resp = await fetchBillByOtp(otp);
      console.log(resp);
      setBillDetailes(resp);
    } catch (err: any) {
      console.log(err);
      console.log(err.response);
      toast.error(`${err.toString()}`, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    fetchBill();
  }, []);

  const handleChange = (event: any) => {
    const amt = event.target.value;
    setDonationAmount(amt);
  };
  const cancelButtonRef = useRef(null);

  // const create = async () => {
  //   try {
  //     const resp = await createBill(user_id, donationAmount, membership_id);
  //     console.log(resp.status);
  //     setCheckOut(true);
  //     dispatch(resetUserState());
  //     setBillDetailes(resp.billDetails);
  //     console.log(resp.billDetails);
  //     toast.success(`successfully checkedout !!!`, {
  //       position: "top-center",
  //       autoClose: 1500,
  //     });
  //   } catch (err: any) {
  //     toast.error(`${err.toString()}`, {
  //       position: "top-center",
  //       autoClose: 1500,
  //     });
  //   }
  // };
  const getDonation = async () => {
    try {
      const resp = await setDonationAmt(user_id, donationAmount);
      toast.success(`Thank you for your donation !`, {
        position: "top-center",
        autoClose: 1500,
      });
      dispatch(
        setHasDonated({
          status: true,
        })
      );
      fetchBill();
      return resp.data;
    } catch (err) {
      console.log(err);

      toast.error(`There was some error try in sometime :(!`, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  const handleCheckout = () => {
    getDonation();
    setOpen(false);
  };
  const onBtn = () => {
    console.log("hello");
    navigate("/app");
  };
  {
    if (type === "food_bill" && !billDetails?.DishItems.length)
      return (
        <p className="text-center capitalize flex w-full h-screen justify-center items-center ">
          <p className="text-lg top-[-20px]">No Dish items ordered!</p>
          <ToastContainer
            toastClassName={() =>
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
            }
          />
          <Button className="fixed top-4 left-4 bg-blue-500" onClick={onBtn}>
            Home
          </Button>
        </p>
      );
  }
  {
    if (type === "drink_bill" && !billDetails?.DrinkItems.length)
      return (
        <p className="text-center capitalize flex w-full h-screen justify-center items-center ">
          <p className="text-lg top-[-20px]">No drink items ordered!</p>
          <ToastContainer
            toastClassName={() =>
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
            }
          />
          <Button className="fixed top-4 left-4 bg-blue-500" onClick={onBtn}>
            Home
          </Button>
        </p>
      );
  }
  const val =
    (type === "food_bill" &&
      !billDetails?.DrinkItems.length &&
      billDetails?.DishItems.length) ||
    (type === "drink_bill" &&
      !billDetails?.DishItems.length &&
      billDetails?.DrinkItems.length) ||
    (type === "drink_bill" &&
      billDetails?.DishItems.length &&
      billDetails?.DrinkItems.length);
  return (
    <>
      <ToastContainer
        toastClassName={() =>
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
        }
      />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-50 px-2 max-w-xl mx-auto">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-md mx-auto w-full max-w-lg rounded-md">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-2xl items-center justify-center text-center">
                <p className="">F and B Systems</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th className="py-3.5 px-3 text-left text-sm font-semibold text-slate-800">
                        Description
                      </th>
                      <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-800">
                        Price
                      </th>
                      <th className="py-3 px-2 text-right text-sm font-semibold text-slate-800">
                        Quantity
                      </th>
                      <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-800">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {type === "food_bill" &&
                      billDetails?.DishItems.map((dishItem, index) => (
                        <TableRow
                          key={index}
                          name={dishItem.name}
                          price={dishItem.price}
                          quantity={dishItem.quantity}
                          amount={dishItem.amount}
                        />
                      ))}
                    {type === "drink_bill" &&
                      billDetails?.DrinkItems.map((drinkItem, index) => (
                        <TableRow
                          key={index}
                          name={drinkItem.name}
                          price={drinkItem.price}
                          quantity={drinkItem.quantity}
                          amount={drinkItem.amount}
                        />
                      ))}
                  </tbody>
                </table>
                {billDetails && (
                  <table className="min-w-full divide-y divide-slate-500">
                    <tbody>
                      {type === "food_bill" && (
                        <TableFooterRow
                          title="Food total"
                          amount={
                            billDetails.dishTotal -
                            parseFloat(billDetails.service_tax)
                          }
                          isBold
                        />
                      )}
                      {type === "drink_bill" && (
                        <TableFooterRow
                          title="Drink total"
                          amount={
                            billDetails.drinkTotal -
                            parseFloat(billDetails.service_tax)
                          }
                          isBold
                        />
                      )}

                      <TableFooterRow
                        title="service tax"
                        amount={parseFloat(billDetails.service_tax)}
                        isBold
                      />
                      {((type === "food_bill" &&
                        !billDetails?.DrinkItems.length &&
                        billDetails?.DishItems.length) ||
                        (type === "drink_bill" &&
                          !billDetails?.DishItems.length &&
                          billDetails?.DrinkItems.length) ||
                        (type === "drink_bill" &&
                          billDetails?.DishItems.length &&
                          billDetails?.DrinkItems.length)) && (
                        <TableFooterRow
                          title="Donation amt"
                          amount={parseFloat(billDetails.donationAmount)}
                          isBold
                        />
                      )}
                      {/* <TableFooterRow
                        title="Grand Total"
                        amount={billDetails.grandTotal}
                        isBold
                      /> */}
                      {type === "food_bill" && (val ? 
                        <TableFooterRow
                          title="Dish Grand total"
                          amount={
                            billDetails.dishTotal +
                            parseFloat(billDetails.donationAmount)
                          }
                          isBold
                        />
                       : 
                        <TableFooterRow
                          title="Dish Grand total"
                          amount={billDetails.dishTotal}
                          isBold
                        />)
                      }
                      {type === "drink_bill" && (val ? 
                        <TableFooterRow
                          title="Drink Grand total"
                          amount={
                            billDetails.drinkTotal +
                            parseFloat(billDetails.donationAmount)
                          }
                          isBold
                        />
                       : 
                        <TableFooterRow
                          title="Drink Grand total"
                          amount={billDetails.drinkTotal}
                          isBold
                        />)
                      }
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <a
                  href="app"
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-md shadow-sm"
                >
                  Back to Menu {type === "food_bill"} {type === "drink_bill"}
                </a>
                {/* {(type === "food_bill" &&
                  !billDetails?.DrinkItems.length &&
                  billDetails?.DishItems.length) ||
                  (type === "drink_bill" &&
                    !billDetails?.DishItems.length &&
                    billDetails?.DrinkItems.length) ||
                  (type === "drink_bill" &&
                    billDetails?.DishItems.length &&
                    billDetails?.DrinkItems.length)?"o":"p"} */}
              </div>
            </div>
          </div>
        </div>
        {((type === "food_bill" &&
          !billDetails?.DrinkItems.length &&
          billDetails?.DishItems.length) ||
          (type === "drink_bill" &&
            !billDetails?.DishItems.length &&
            billDetails?.DrinkItems.length) ||
          (type === "drink_bill" &&
            billDetails?.DishItems.length &&
            billDetails?.DrinkItems.length &&
            !donated)) && (
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-y-scroll rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div>
                        <div className="mt-3 text-center sm:mt-5">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-semibold leading-6 text-gray-900"
                          >
                            Feed a Tribal Child !!!
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-700 text-center">
                              <p className="text-md text-red-500 font-semibold">
                                Hope you had a great time and a great meal with
                                your Friends and Family..
                              </p>
                              Would you like to buy an adivasi kid a meal? Any
                              amount you donate, we will buy rice and send it to
                              Adivasi hostels in Karnataka.
                              <section className="sandbox__carousel">
                                <EmblaCarousel
                                  slides={SLIDES}
                                  options={OPTIONS}
                                />
                              </section>
                              <span className="font-semibold text-blue-700">
                                Mothers of Namma Shimoga (Mahila Sanghas)
                              </span>{" "}
                              have been feeding 100s of kids by keeping away
                              just a<br />
                              <span className="font-semibold text-blue-700">
                                {" "}
                                fistfull of rice
                              </span>{" "}
                              aside every time they cook. Which is accounting
                              for about{" "}
                              <span className="font-semibold text-blue-700">
                                500 kg every month
                              </span>
                              . Under Musti Akki Yojane
                              <br></br>
                              <br></br>
                              Hani Hani Kudidare Halla!
                              <br></br>
                              <br></br>
                              To participate in this program, please contact
                              Suma Murthy{" "}
                              <a className="text-blue-600">+91 9844058655 </a>
                              <br></br>
                              <br></br>
                              For more information about the organisation,
                              please visit
                              <a className="text-blue-700">
                                {" "}
                                https://www.vanavasikalyana.org
                              </a>{" "}
                              (Backed by central Government)
                              <br></br>
                              <br></br>
                              Thank you so much. A kid will sleep with a full
                              stomach because of you.
                              <br></br>
                              <br></br>
                              <p className="font-semibold text-red-600">
                                Please Note: You can always press 0, no hard
                                feelings, probably next time :)
                                <br></br>
                                <br></br>
                                -Aamara Technologies
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                        <label
                          htmlFor="donation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enter donation amount:
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">
                              &#8377;
                            </span>
                          </div>
                          <input
                            type="number"
                            name="donation"
                            id="donation"
                            onChange={handleChange}
                            value={donationAmount}
                            className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                        </div>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                          onClick={handleCheckout}
                          ref={cancelButtonRef}
                        >
                          Donate amount
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </div>
    </>
  );
};

export default Ordercheckout;
