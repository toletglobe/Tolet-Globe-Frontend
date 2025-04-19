import React from "react";
import { useNavigate } from "react-router-dom";

import side from "../../../assets/propertyListing/side.png";

const SideOpt = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className=" flex w-full py-3 px-4 border-b-2 border-[#D9D9D9] ">
        <p className="lg:text-xl md:text-xl text-lg font-semibold mb-2 w-3/4">
          Sign in to get a personalized feed!
        </p>
        <button
          className="h-10 w-2/4 rounded-xl bg-[#40B5A8] text-white font-semibold hover:bg-[#36a094] transition"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>

      <div className="flex items-center  w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
        <p className=" font-semibold mb-2">Property Services</p>
        <img src={side} alt="Property Services" className="" />
      </div>

      <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
        <div className="flex items-center justify-center gap-8">
          <p className="text-md font-semibold">MB Advice</p>
          <div className="w-16 h-5 bg-[#FFC100] rounded-full  flex items-center justify-center text-xs font-bold text-black">
            New
          </div>
        </div>
        <img src={side} alt="MB Advice" className="" />
      </div>

      <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
        <p className="text-md font-semibold">Help</p>
        <img src={side} alt="Help" className="" />
      </div>

      <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
        <p className="text-md font-semibold">Wishlist</p>
        <img src={side} alt="Wishlist" className="" />
      </div>

      <div className=" flex items-center  w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
        <p className="text-md font-semibold">Visit Properties</p>
        <img src={side} alt="Visit Properties" className="" />
      </div>
    </div>
  );
};

export default SideOpt;
