import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ img, title, bg, path, description }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path)} className="group cursor-pointer">
      {/* Mobile & Tablet View */}
      <div className="relative bg-[#D4DED8] rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-full transition-shadow duration-300 cursor-pointer lg:hidden h-[180px] md:w-[240px] md:h-[220px]">
        <div className="flex justify-center items-center h-[40%]">
          <img
            src={img}
            className="h-[40px] w-[40px] my-6 object-contain"
            alt={title}
          />
        </div>
        <div
          className={`rounded-b-lg text-left flex flex-col px-4 ${bg} h-[60%] py-3`}
        >
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-black line-clamp-2">
            {title}
          </h1>
          <p className="text-black font-normal text-[09px] sm:text-xs tracking-[0%] mt-1 leading-tight">
            {description}
          </p>
        </div>
      </div>

      {/* Laptop View */}
      <div className="hidden lg:block w-[277px] h-[280px] rounded-[10px] overflow-hidden relative flex-col items-start justify-center text-left transition-all duration-300 hover:scale-105">
        <div className="w-full h-[40%] flex items-center justify-center bg-[#D4DED8]">
          <img
            src={img}
            alt={title}
            className="w-[80px] h-[80px] object-contain"
          />
        </div>
        <div
          className={`w-full h-[60%] flex flex-col justify-center rounded-b-[10px] p-4 ${bg}`}
        >
          <h2 className="text-black font-bold text-2xl leading-[36px] tracking-[0%] max-w-full break-words">
            {title}
          </h2>
          <p className="text-black font-normal text-sm leading-5 tracking-[0%] max-w-full break-words mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
