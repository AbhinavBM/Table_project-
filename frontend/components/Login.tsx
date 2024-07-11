/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  setOtp,
  setMemberInfo,
  resetUserState,
  setHasDonated
} from "./../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TEST_URL } from "./../URL";
import fetchAllTables from "./../apis/GET/fetchAllTables";
import fetchMemberInfo from "../apis/POST/fetchMemberInfo";
import fetchAllMembers from "./../apis/GET/fetchAllMembers";

import { Membership, Table } from "./../apis/types";
import { resetCartItems } from "./../store/slices/menuSlice";
import { clearItems } from "../store/slices/cartDrinkSlice";
import { clearDishItems } from "./../store/slices/cartDishSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    tableNo: "",
  });
  const tableNoRef = useRef<HTMLSelectElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState({
    member_name: "",
    membership_id: "",
    member_phoneNo: "",
  });
  const [selectedMember, setSelectedMember] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberNameChange = (event: any) => {
    const { value } = event.target;
    setMemberData((prev) => ({
      ...prev,
      member_name: value,
    }));
  };

  const handelReChange = () => {
    setMemberData((prev) => ({
      ...prev,
      member_name: "",
      membership_id: "",
      member_phoneNo: "",
    }));
    setSelectedMember((prev) => !prev);
  };

  const [memberList, setMemberList] = useState<Membership[]>([]);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log({ ...formData, ...memberData })
      const response = await fetch(`${TEST_URL}/api/client/createCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ...memberData }),
      });
      if (response.ok) {
        const responseData = await response.json();
        const { otp, user_id, tableNo } = responseData;
        console.log(responseData);
        const { name, phoneNo } = formData;
        dispatch(
          setUserInfo({
            username: name,
            phoneNumber: phoneNo,
            tableNo: tableNo,
          })
        );
        dispatch(setOtp({ otp: otp, user_id: user_id }));
        dispatch(setHasDonated({
          status:false,
        }))
        console.log("Data sent successfully!");
        navigate("/verify");
      } else {
        console.error("Error sending data.");
        toast.error("error", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberInfo = async (member_id: any) => {
    try {
      const resp = await fetchMemberInfo(member_id);
      console.log(resp);
      dispatch(
        setMemberInfo({
          member_name: resp.name,
          membership_id: resp.membership_id,
          member_phoneNo: resp.phoneNo,
        })
      );
      setMemberData((prev) => {
        return { ...prev, member_phoneNo: resp.phoneNo };
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log(memberData);
    }
  };
  // useEffect(() => {
  //   if (formData.phoneNo.length == 10) {
  //     getMemberInfo();
  //   }
  // }, [formData.phoneNo]);

  const getTables = async () => {
    try {
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
    }
  };

  const handelChangeTable = () => {
    const selectedTableNo = tableNoRef.current?.value;
    setFormData((prev) => ({
      ...prev,
      tableNo: selectedTableNo || "",
    }));
  };

  const memberClick = (event: any) => {
    const selectedValue = event.currentTarget.getAttribute("data-value");
    const member_id = event.currentTarget.getAttribute("data-id");
    setMemberData((prev) => ({
      ...prev,
      member_name: selectedValue,
      membership_id: member_id,
    }));
    setSelectedMember(true);
    getMemberInfo(member_id);
    console.log(true);
  };

  const getMemberList = async () => {
    try {
      const memberList = await fetchAllMembers();
      setMemberList(memberList);
      console.log(memberList);
    } catch (err) {
      toast.error("error", {
        position: "top-center",
        autoClose: 1500,
      });
      console.log(err);
    }
  };
  useEffect(()=>{
     dispatch(resetUserState());
     dispatch(resetCartItems());
     dispatch(clearItems());
     dispatch(clearDishItems());
  },[])
  useEffect(() => {
    getTables();
  }, []);
  useEffect(() => {
    getMemberList();
  }, []);
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="p-4 max-w-lg m-auto">
        <ToastContainer
          toastClassName={() =>
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
          }
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 px-2">
          Login to F and B System
        </h2>
        <div className="mt-4 mx-auto w-full max-w-md px-4 mb-10">
          <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="font-bold text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-gray-700 mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone-number"
                  className="font-bold text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="text-gray-700 mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="name" className="font-bold text-gray-700">
                  Member Name
                </label>
                <div className="mt-1">
                  <input
                    id="member-name"
                    type="text"
                    name="member-name"
                    required
                    onChange={handleMemberNameChange}
                    value={memberData.member_name}
                    readOnly={selectedMember}
                    placeholder="Enter member name"
                    className="text-gray-700 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm relative"
                  />
                  {memberData.member_name && !selectedMember && (
                    <ul className="flex flex-col my-2 border-2 p-2 rounded-sm absolute w-[76%] bg-white ">
                      {memberData.member_name &&
                        memberList.map((member, index) => {
                          const memberName = member.rahil.toLowerCase();
                          const searchMember =
                            memberData.member_name.toLowerCase();
                          return memberName.startsWith(searchMember) ? (
                            <li
                              key={index}
                              data-id={member.membership_id}
                              data-value={member.rahil}
                              onClick={memberClick}
                            >
                              {member.rahil}
                            </li>
                          ) : null;
                        })}
                    </ul>
                  )}
                </div>
                {selectedMember && (
                  <p
                    className="float-right text-sm inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700"
                    onClick={handelReChange}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                      />
                    </svg>
                    Change
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="member-phone-number"
                  className="font-bold text-gray-700"
                >
                  Member Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={memberData.member_phoneNo}
                  required
                  readOnly
                  className="text-gray-700 mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              {/* <div>
              <label htmlFor="member-id" className="font-bold text-gray-700">
                Member id
              </label>
              <div className="mt-1">
                <input
                  id="member-id"
                  type="text"
                  name="member-id"
                  required
                  readOnly
                  value={memberData.membership_id}
                  placeholder="Enter member id"
                  className="text-gray-700 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div> */}
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
                  {tables.map((table) => {
                    {
                      return (
                        <option key={table.tableNo}>{table.tableNo}</option>
                      );
                    }
                  })}
                </select>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md font-bold border border-transparent bg-blue-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Submitted" : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
