import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, bg, path, description}) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-full transition-shadow duration-300 cursor-pointer"
      
    >
      <div className="flex justify-center items-center p-4">
        <img 
          src={img} 
          className="h-14 w-14 sm:h-16 sm:w-16 object-contain" 
          alt={title}
        />
      </div>
      <div
        className={`${bg} rounded-b-lg text-center transition-all duration-300 group-hover:bg-opacity-80 min-h-[3.5rem] flex items-center justify-center px-2`}
      >
        <h1 className="text-base sm:text-lg md:text-xl font-bold whitespace-normal leading-tight">
          {title}
        </h1>
      </div>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${bg} bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        onClick={() => navigate(path)}
      >
        <h1 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center" >
          {title}
        </h1>
        <p className="text-sm text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
