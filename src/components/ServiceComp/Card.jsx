import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, bg, path, description }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path)} className="group cursor-pointer">
      {/* Mobile & Tablet View */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-full transition-shadow duration-300 cursor-pointer lg:hidden">
        <div className="flex justify-center items-center pl-[59.18px] pr-[59.18px] pt-[23px] pb-[23px]">
          <img
            src={img}
            className="h-[51.52px] w-[51.52px] sm:h-[51.52px] sm:w-[51.52px] object-contain"
            alt={title}
          />
        </div>
        <div
          className={`rounded-b-lg text-center transition-all duration-300 group-hover:bg-opacity-80 min-h-[3.5rem] flex items-center justify-center px-2 ${bg}`}
        >
          <h1 className="text-base sm:text-lg md:text-xl font-bold whitespace-normal leading-tight">
            {title}
          </h1>
        </div>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${bg} bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          <h1 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">
            {title}
          </h1>
          <p className="text-sm text-center">{description}</p>
        </div>
      </div>

      {/* Laptop View */}
      <div className="hidden lg:block w-[277px] h-[280px] rounded-[10px] overflow-hidden relative flex flex-col items-start justify-center text-left transition-all duration-300 hover:scale-105">
        <div className="w-full h-[50%] flex items-center justify-center bg-[#D4DED8]">
          <img src={img} alt={title} className="w-[80px] h-[80px] object-contain" />
        </div>
        <div
          className={`w-full h-[50%] flex flex-col justify-center rounded-b-[10px] p-4 ${bg}`}
        >
          <h2 className="text-black font-[Poppins] font-bold text-[24px] leading-[36px] tracking-[0%] max-w-full break-words">
            {title}
          </h2>
          <p className="text-black font-[Poppins] font-normal text-[13px] leading-[19.5px] tracking-[0%] max-w-full break-words mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
