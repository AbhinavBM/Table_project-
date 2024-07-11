import React from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUserInfo } from "./../store/slices/authSlice";
import callWaiter from "../apis/POST/callWaiter";
import { BellIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CallWaiterBtn: React.FC = () => {
  const info = useSelector(selectUserInfo);
  const handleClick = async () => {
    try {
      const resp = await callWaiter(info);
      console.log(resp);
      toast.success(`your waiter will be arriving shortly`, {
        position: "top-center",
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err);
      toast.error(`unfortunately coudn't call waiter`, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  return (
    <>
      <ToastContainer toastClassName={() => 
        "fixed flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
      }/>
      <div className="flex gap-2 font-bold" onClick={handleClick}>
        Call Waiter
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </div>
    </>
  );
};
export default CallWaiterBtn;
