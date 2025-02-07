import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, bg, path, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`group relative overflow-hidden shadow-lg hover:shadow-xl w-48 h-auto sm:w-56 sm:h-auto transition-all duration-300 cursor-pointer flex flex-col text-left rounded-lg`}
      onClick={() => navigate(path)}
    >
      <div className="flex justify-center items-center bg-gray-300 w-full h-32 sm:h-40 p-3">
        <img
          src={img}
          className="max-h-full max-w-full object-contain"
          alt={title}
        />
      </div>
      <div className={`w-full transition-all duration-300 ${bg} flex flex-col justify-center items-center rounded-b-lg p-3 overflow-hidden`}> 
        <h1 className="text-sm sm:text-base md:text-lg font-bold text-black group-hover:text-white break-words text-center w-full">{title}</h1>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-black group-hover:text-white text-center break-words w-full">{description}</p>
      </div>
    </div>
  );
};

export default Card;
