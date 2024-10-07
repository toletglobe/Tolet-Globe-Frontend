import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, bg, path, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-[80%] transition-shadow duration-300"
      onClick={() => navigate(path)} // Navigate to the path when card is clicked
    >
      <div className="flex justify-center items-center p-5">
        <img src={img} className="h-20 w-auto" alt={title} />
      </div>
      <div
        className={`p-4 ${bg} rounded-b-lg text-center transition-all duration-300 group-hover:bg-opacity-80`}
      >
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-5 ${bg} bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;
