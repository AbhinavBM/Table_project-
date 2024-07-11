import React from "react";

const Skeliton: React.FC = () => {
  return (
    <div className="skeleton p-4 shadow-md items-center justify-center align-middle">
      <div className="skeleton-left">
        <div className="linemod h17 w-2/5 rounded-xl border bg-white"></div>
        <div className="line h17 w-3/5 m10"></div>
        <div className="line w-6"></div>
        <div className="line h8 w50"></div>
        <div className="line h8 w75"></div>
        <div className="line h8 w-full"></div>
        <div className="line h8 w-full"></div>
        <div className="line h8 w-full"></div>
      </div>
      <div className="skeleton-right">
        <div className="flex flex-col justify-center items-center">
          <div className="square shadow object-cover aspect-square"></div>
          <div className="flex relative bottom-[0.8rem]">
            <div className="linemod w70 h30 rounded-md shadow-md border border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkelitonLoad: React.FC = () => {
  return (
    <div className="py-0 px-3 flex justify-center w-full flex-col">
      <Skeliton />
      <Skeliton />
      <Skeliton />
    </div>
  );
};
export default SkelitonLoad;
