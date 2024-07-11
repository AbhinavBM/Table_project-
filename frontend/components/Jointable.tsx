/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { Input } from "../src/components/ui/input";
import fetchAllTables from "./../apis/GET/fetchAllTables";
import fetchDetails from "./../apis/GET/fetchDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Table } from "./../apis/types";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  setOtp,
  setMemberInfo,
  setHasDonated,
  resetUserState,
} from "./../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { resetCartItems } from "./../store/slices/menuSlice";
import { clearItems as clearDrinkItems} from "./../store/slices/cartDrinkSlice";
import { clearDishItems } from "./../store/slices/cartDishSlice";
const Jointable = () => {
  const navigate=useNavigate();
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tableNoRef = useRef<HTMLSelectElement | null>(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    tableNo: "",
    otp: "",
  });

  const getTables = async () => {
    try {
      setIsLoading(true);
      const Tables = await fetchAllTables();
      setTables([
        { _id: "", tableNo: "", active: "true", maxPeople: "", __v: 0 },
        ...Tables,
      ]);
    } catch (err) {
      console.log(err);
      toast.error("error", {
        position: "top-center",
        autoClose: 1500,
      });
      navigate("/")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTables();
    dispatch(resetUserState())
    dispatch(resetCartItems());
    dispatch(clearDrinkItems());
    dispatch(clearDishItems());
  }, []);

  const handelChangeTable = () => {
    const selectedTableNo = tableNoRef.current?.value;
    setFormData((prev) => ({
      ...prev,
      tableNo: selectedTableNo || "",
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      otp: event.target.value,
    }));
  };

  // "member_name": "Rahil M Harihar - 1265",
  // "member_phoneNo": "9902588982",
  // "membership_id": "1265",
  // "name": "Yash",
  // "phoneNo": "08587979420",
  // "tableNo": "7",
  // "userStatus": "0",
  // "user_id":
  const handleContinue = async () => {
    console.log(formData);
    try {
      const res = await fetchDetails(formData);
      const {
        user_id,
        member_name,
        member_id,
        name,
        member_phoneNo,
        phoneNo,
      } = res;
      dispatch(setHasDonated({
        "status":false,
      }));
      dispatch(
        setOtp({
          otp: formData.otp,
          user_id: user_id,
        })
      );
      dispatch(
        setMemberInfo({
          member_name,
          member_phoneNo,
          membership_id: member_id,
        })
      );
      dispatch(
        setUserInfo({
          username: name,
          phoneNumber: phoneNo,
          tableNo: formData.tableNo,
        })
      );
      navigate("/app")
    } catch (err: any) {
      toast.error(err.message.toString());
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-50 py-12 px-2 max-w-xl mx-auto">
      <ToastContainer />
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Join Existing table</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Enter the OTP of the registered table to join the table</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-8">
              <div>
                <label htmlFor="id" className="font-bold text-gray-700">
                  Table Number
                </label>
                <select
                  id="table_no"
                  name="table_no"
                  className="mt-1 block w-full bg-slate-50 text-gray-700 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  onChange={handelChangeTable}
                  ref={tableNoRef}
                >
                  {tables.map((table) => (
                    <option key={table.tableNo}>{table.tableNo}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mx-auto w-full">
                <label className="font-bold text-gray-700">
                  OTP sent to the table
                </label>
                <Input
                  onChange={handleChange}
                  value={formData.otp}
                  name="otp"
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg border border-gray-500 text-lg bg-white ring-blue-700"
                />
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <Button
                    disabled={isLoading}
                    onClick={handleContinue}
                    className="flex w-full justify-center rounded-md font-bold border border-transparent bg-blue-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isLoading ? "verifying ..." : "Join"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jointable;

